<template>
    <b-jumbotron>
        <template slot="header">
            Movie Night
        </template>

        <template slot="lead">
            This page will choose a movie for you!
        </template>

        <hr class="my-4">

        <div v-if="!movie">
            <p>What movie will we be watching tonight?</p>
            <b-btn variant="primary" v-on:click="pick" v-if="!thinking">Choose Movie</b-btn>
            <b-btn variant="primary" disabled v-if="thinking">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Thinking...
            </b-btn>
        </div>

        <transition name="fade">
            <div v-if="movie">
                <p>Awesome! We're watching <em><strong>'{{ movie.title }}'</strong></em>. How does that sound?</p>
                <MovieData :movie="movie" class="mb-3"></MovieData>
                <div v-if="!thinking">
                    <b-btn variant="danger" v-on:click="pick">No thanks!</b-btn>
                    <b-btn variant="success" v-on:click="watch" class="ml-3">Sure!</b-btn>
                </div>
                <div v-if="thinking">
                    <b-btn variant="danger" disabled v-if="thinking">
                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Thinking...
                    </b-btn>
                    <b-btn variant="success" v-on:click="watch" disabled class="ml-3">Sure!</b-btn>
                </div>
            </div>
        </transition>
    </b-jumbotron>
</template>

<script>
    import moviesRepository from '../moviesRepository'
    import MovieData from './movie/MovieData'

    export default {
        name: 'MoviePicker',
        components: {
            MovieData
        },
        data: function () {
            return {
                movie: null,
                thinking: false,
            };
        },
        methods: {
            pick() {
                this.thinking = true;

                setTimeout(() => {
                    this.movie = moviesRepository.random();
                    this.thinking = false;
                }, 2000);
            },
            watch() {
                moviesRepository.watch(this.movie);
                this.movie = null;
            }
        }
    }
</script>
