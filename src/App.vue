<template>
  <div id="app">
    <local-time></local-time>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LocalTime from './components/LocalTime.vue';

export default Vue.extend({
  name: 'app',
  components: {
    LocalTime,
  },
});
</script>

<style>
*,
*::before,
*::after {
  box-sizing: inherit;
}
html {
  box-sizing: border-box;
  font-size: 62.5%;
}
body {
  background: #00c9ff;
  background: -webkit-linear-gradient(to bottom, #92fe9d, #00c9ff);
  background: linear-gradient(to bottom, #92fe9d, #00c9ff);
  color: #333333;
  font-family: 'Varela Round', sans-serif;
  font-size: 1.6rem;
  height: 100vh;
  line-height: 1.75;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
