<template>
        <b-tabs card>
            <b-tab title="Search" active>
                <SearchMovies></SearchMovies>
            </b-tab>
            <b-tab title="Manual Add">
                <AddMovie></AddMovie>
            </b-tab>
        </b-tabs>
</template>

<script>
    import SearchMovies from "./movies/SearchMovies";
    import AddMovie from "./movies/AddMovie";

    export default {
        components: {
            AddMovie,
            SearchMovies
        }
    }
</script>
