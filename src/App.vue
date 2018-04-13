<template>
  <div id="app">
    <time-card :dateTime="dateTime" :timeFormat="timeFormat"></time-card>
  </div>
</template>

<script lang="ts">
import Worker from 'worker-loader!./worker';
import Vue from 'vue';
import { DateTime } from 'luxon';
import TimeCard from './components/TimeCard.vue';

export default Vue.extend({
  name: 'app',
  components: {
    TimeCard,
  },
  data() {
    return {
      dateTime: null as any,
      timeFormat: '12hr',
      zoneName: DateTime.local().zoneName,
    };
  },
  mounted() {
    const worker = new Worker();
    worker.postMessage('start');
    worker.onmessage = (event: any) => {
      this.dateTime = DateTime.fromMillis(event.data.time);
    };
  },
  methods: {
    updateTimeFormat(newTimeFormat: string) {
      this.timeFormat = newTimeFormat;
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
  height: 100vh;
}
body {
  background-image: url('./assets/bg.svg');
  background-size: cover;
  color: #333333;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 1.6rem;
  line-height: 1.75;
  margin: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app {
  margin: 0 auto;
  max-width: 700px;
  padding: 0 1.2rem;
  width: 100%;
}
</style>
