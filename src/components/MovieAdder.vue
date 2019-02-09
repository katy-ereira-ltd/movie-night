<template>
        <b-tabs card>
            <b-tab title="Search" active>
                <SearchMovies></SearchMovies>
            </b-tab>
        </b-tabs>
</template>

<script>
    import SearchMovies from "./movies/SearchMovies";

    export default {
        components: {
            SearchMovies
        }
    }
</script>
