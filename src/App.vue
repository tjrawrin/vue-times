<template>
  <div id="app">
    <time-format :tf="timeFormat" @update="updateTimeFormat"></time-format>
    <time-card :dt="localDateTime" :tf="timeFormat" :zn="localZoneName"></time-card>
    <time-zone-search @update="updateOtherZone"></time-zone-search>
    <time-card :dt="otherDateTime" :tf="timeFormat" :zn="otherZoneName"></time-card>
    <div class="Footer">
      Disclaimer! Not all cities and/or zone names in the world are included in the search. Results may vary.
    </div>
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
      localDateTime: null as any,
      localZoneName: moment.tz.guess(),
      otherDateTime: null as any,
      otherZoneName: moment.tz.guess(),
      timeFormat: '12hr',
    };
  },
  mounted() {
    const worker = new Worker();
    worker.postMessage('start');
    worker.onmessage = (event: any) => {
      this.localDateTime = moment.tz(event.data.time, this.localZoneName);
      this.otherDateTime = moment.tz(event.data.time, this.otherZoneName);
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
.Footer {
  border-top: 1px dotted #00000065;
  font-size: 1.2rem;
  margin: 2.4rem 0;
  padding: 0.8rem 0;
  text-align: center;
}
</style>
