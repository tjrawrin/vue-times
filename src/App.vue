<template>
  <div id="app">
    <time-format :format="format" @update="updateFormat"></time-format>
    <local-time :dateTime="dt" :format="format"></local-time>
  </div>
</template>

<script lang="ts">
import Worker from 'worker-loader!./worker';
import Vue from 'vue';
import { DateTime } from 'luxon';
import LocalTime from './components/LocalTime.vue';
import TimeFormat from './components/TimeFormat.vue';

export default Vue.extend({
  name: 'app',
  components: {
    LocalTime,
    TimeFormat,
  },
  data() {
    return {
      dt: null as any,
      format: '12hr',
    };
  },
  mounted() {
    const worker = new Worker();
    worker.postMessage('start');
    worker.onmessage = (event: any) => {
      this.dt = DateTime.fromMillis(event.data.time);
    };
  },
  methods: {
    updateFormat(newFormat: string) {
      this.format = newFormat;
    },
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
#app {
  display: grid;
  grid-gap: 1.6rem;
  grid-template-columns: 1fr 25.6rem 25.6rem 1fr;
  grid-template-rows: 1fr 12.8rem 1fr;
  margin: 1.6rem;
}
</style>
