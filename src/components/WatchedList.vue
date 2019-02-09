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
                        <i class="material-icons md-18 btn" v-on:click="rewatch(movie)" v-b-tooltip.hover title="Watch again">refresh</i>
                        <i class="material-icons md-18 btn" v-on:click="remove(movie)" v-b-tooltip.hover title="Not watched">not_interested</i>
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
        name: 'WatchedList',
        components: {
            MovieData,
        },
        data: () => {
            return {
                movies: moviesRepository.storage.watched
            };
        },
        methods: {
            rewatch(movie) {
                moviesRepository.add(movie);
            },
            remove(movie) {
                moviesRepository.unwatch(movie);
            },
        }
    }
</script>
