<template>
    <b-row class="d-flex w-100 justify-content-between">
        <b-col class="col-2">
            <img style="height:200px;"
                 v-bind:src="movie.image || 'https://fakeimg.pl/131x190?text=no cover'"
                 v-bind:alt="movie.title"
                 class="img-thumbnail"
            >
        </b-col>
        <b-col>
        <p class="mb-3">
            {{ movie.synopsis || 'No synopsis found.' }}
        </p>
        <dl>
            <div class="row">
                <dt class="col-sm-3">Released</dt>
                <dd class="col-sm-9">{{ movie.released || 'unknown' }}</dd>
            </div>
            <div class="row">
                <dt class="col-sm-3">Runtime</dt>
                <dd class="col-sm-9">{{ movie.runtime || 'unknown' }}</dd>
            </div>
            <MovieRating :rating="parseInt(movie.rating)" :max="10"></MovieRating>
        </dl>
        </b-col>
    </b-row>
</template>

<script>
    import MovieRating from "./MovieRating";

    export default {
        name: 'MovieData',
        props: {
            movie: null
        },
        components: {
            MovieRating
        }
    };
</script>