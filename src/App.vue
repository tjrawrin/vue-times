<template>
  <div id="app">
    <time-format :timeFormat="timeFormat" @update="updateTimeFormat"></time-format>
    <time-card :dateTime="dateTime" :timeFormat="timeFormat" :zoneName="localZoneName"></time-card>
    <time-zone-search @update="updateOtherZone"></time-zone-search>
    <time-card :dateTime="dateTime" :timeFormat="timeFormat" :zoneName="otherZoneName"></time-card>
  </div>
</template>

<script lang="ts">
import Worker from 'worker-loader!./worker';

import Vue from 'vue';
import moment from 'moment-timezone';

import TimeCard from './components/TimeCard.vue';
import TimeFormat from './components/TimeFormat.vue';
import TimeZoneSearch from './components/TimeZoneSearch.vue';

export default Vue.extend({
  name: 'app',
  components: {
    TimeCard,
    TimeFormat,
    TimeZoneSearch,
  },
  data() {
    return {
      dateTime: null as any,
      timeFormat: '12hr',
      localZoneName: moment.tz.guess(),
      otherZoneName: moment.tz.guess(),
    };
  },
  mounted() {
    const worker = new Worker();
    worker.postMessage('start');
    worker.onmessage = (event: any) => {
      this.dateTime = moment(event.data.time);
    };
  },
  methods: {
    updateTimeFormat(newTimeFormat: string) {
      this.timeFormat = newTimeFormat;
    },
    updateOtherZone(newZoneName: string) {
      this.otherZoneName = newZoneName;
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
