<template>
  <div id="app">
    <b-container class="bv-example-row mb-5">
      <b-row>
        <b-col>
          <MoviePicker/>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import MoviePicker from './components/MoviePicker.vue'

export default {
  name: 'app',
  components: {
    MoviePicker,
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
