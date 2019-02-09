<template>
  <div id="app">
    <b-container class="bv-example-row mb-5">
      <b-row>
        <b-col>
          <MoviePicker/>
        </b-col>
      </b-row>
      <b-card no-body>
        <b-tabs pills card>
          <b-tab title="Movies List" active>
            <MovieList/>
          </b-tab>
          <b-tab title="Add More Movies">
            <MovieAdder/>
          </b-tab>
          <b-tab title="Watched Movies">
            <WatchedList/>
          </b-tab>
          <b-tab title="Settings">
            <Settings/>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import MoviePicker from './components/MoviePicker.vue'
import MovieList from './components/MovieList'
import MovieAdder from './components/MovieAdder'
import WatchedList from "./components/WatchedList";
import Settings from "./components/Settings";

export default {
  name: 'app',
  components: {
    WatchedList,
    MoviePicker,
    MovieList,
    MovieAdder,
    Settings,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 3%;
}
</style>
