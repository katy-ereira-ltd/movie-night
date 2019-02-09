<template>
    <b-list-group>
        <b-list-group-item
            v-for="movie in movies"
            v-bind:data="movie.title"
            v-bind:key="movie.id"
        >
            <b-row>
                <b-col class="d-flex w-100 justify-content-between">
                    <h5 class="mr-4">{{ movie.title }}</h5>
                    <div>
                        <i class="material-icons md-18 btn" v-on:click="remove(movie)" v-b-tooltip.hover title="Remove">not_interested</i>
                        <i class="material-icons md-18 btn" v-on:click="watch(movie)" v-b-tooltip.hover title="Watched">done</i>
                    </div>
                </b-col>
            </b-row>
            <MovieData :movie="movie"></MovieData>
        </b-list-group-item>
    </b-list-group>
</template>

<script>
    import moviesRepository from '../moviesRepository'
    import MovieData from "./movie/MovieData";

    export default {
        name: 'MovieList',
        components: {
            MovieData,
        },
        data: () => {
            return {
                movies: moviesRepository.storage.movies
            };
        },
        methods: {
            remove(movie) {
                moviesRepository.remove(movie);
            },
            watch(movie) {
                moviesRepository.watch(movie);
            }
        }
    }
</script>
