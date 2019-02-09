<template>
    <div>
        <b-row class="mt-2 mb-3">
            <b-form inline v-on:submit.prevent="search">
                <b-form-group>
                    <b-input placeholder="Search Netflix" v-model="searchTerm" class="mx-sm-3 mb-2"></b-input>
                    <b-button type="submit" variant="primary" class="mb-2" v-if="!searching">Search</b-button>
                    <b-button variant="primary" class="mb-2" disabled v-if="searching">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Searching...
                    </b-button>
                </b-form-group>
            </b-form>
        </b-row>
        <b-alert
            class="mt-2 mb-3"
            v-for="(error, key) in errors" :key="key + '-error'"
            dismissible
            show
            variant="danger"
        >
            <strong>Oops!</strong> Search failed: {{ error.message }}.
        </b-alert>
        <b-alert
            class="mt-2 mb-3"
            v-if="searchResults.term && !searchResults.items.length && !searching"
            show
            variant="info"
        >
            <strong>Welp.</strong> Nothing found for '{{ searchResults.term }}'.
        </b-alert>
        <b-row v-if="searchResults.term && searchResults.items.length > 0 && !searching">
            <b-list-group>
                <b-list-group-item
                    v-for="result in searchResults.items"
                    v-bind:data="result.title"
                    v-bind:key="result.id"
                >
                    <b-row>
                        <b-col class="d-flex w-100 justify-content-between">
                            <h5 class="mr-4">{{ result.title }}</h5>
                            <i class="material-icons md-18 btn" v-on:click="moveToWatchlist(result)" v-b-tooltip.hover title="Move to watch list">add</i>
                        </b-col>
                    </b-row>
                    <MovieData :movie="result"></MovieData>
                </b-list-group-item>
            </b-list-group>
        </b-row>
    </div>
</template>

<script>
    import moviesRepository from '../../moviesRepository'
    import settingsRepository from '../../settingsRepository'

    import MovieData from "../movie/MovieData";

    import unirest from 'unirest'

    export default {
        name: 'SearchMovies',
        components: {
            MovieData,
        },
        data: () => {
            return {
                apiKey: settingsRepository.get('apiKey'),
                searchTerm: null,
                searching: null,
                searchResults: {
                    term: '',
                    items: [],
                },
                errors: [],
            };
        },
        methods: {
            search() {
                this.searching = true;
                this.errors = [];

                unirest
                    .get(`https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q=${this.searchTerm}-!1900,2018-!0,5-!0,10-!0-!Any-!Any-!Any-!gt100-!{downloadable}&t=ns&cl=46&st=adv&ob=Relevance&p=1&sa=and`)
                    .header("X-RapidAPI-Key", this.apiKey)
                    .end((result) => {
                        if (result.error) {
                            this.errors.push(result.error);
                            this.searching = false;
                            return;
                        }

                        this.searchResults.term = this.searchTerm;
                        this.parseResults(result.body.ITEMS);
                        this.searching = false;
                    });
            },
            parseResults(items) {
                items.forEach((item) => {
                    this.searchResults.items.push({
                        id: item.netflixid,
                        title: item.title,
                        synopsis: this.decodeHtml(item.synopsis),
                        image: item.image,
                        released: item.released,
                        runtime: item.runtime,
                        rating: item.rating
                    });
                });
            },
            decodeHtml(html) {
                var txt = document.createElement("textarea");
                txt.innerHTML = html;
                return txt.value;
            },
            removeResult(result) {
                this.searchResults.items.forEach((item, key) => {
                    if (item.id === result.id) {
                        this.searchResults.items.splice(key, 1);
                    }
                });
            },
            moveToWatchlist(result) {
                moviesRepository.add(result);
                this.removeResult(result);
            },
        }
    }
</script>