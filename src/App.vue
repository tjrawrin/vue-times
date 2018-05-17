<template>
  <div class="App" id="app" role="main">
    <h1 class="App-title">Times</h1>
    <time-format :tf="timeFormat" @update="updateTimeFormat"></time-format>
    <time-card :dt="localDateTime" :tf="timeFormat" :zn="localZoneName"></time-card>
    <time-zone-search @update="updateOtherZone"></time-zone-search>
    <time-card :dt="otherDateTime" :tf="timeFormat" :zn="otherZoneName" v-if="otherZoneName"></time-card>
    <time-difference :diff="timeDifference" v-if="otherDateTime"></time-difference>
  </div>
</template>

<script lang="ts">
import Worker from 'worker-loader!./worker';

import Vue from 'vue';
import moment from 'moment-timezone';

import TimeCard from './components/TimeCard.vue';
import TimeFormat from './components/TimeFormat.vue';
import TimeZoneSearch from './components/TimeZoneSearch.vue';
import TimeDifference from './components/TimeDifference.vue';

export default Vue.extend({
  name: 'app',
  components: {
    TimeCard,
    TimeFormat,
    TimeZoneSearch,
    TimeDifference,
  },
  data() {
    return {
      localDateTime: null as any,
      localZoneName: moment.tz.guess(),
      otherDateTime: null as any,
      otherZoneName: null as any,
      timeFormat: '12hr',
    };
  },
  mounted() {
    const worker = new Worker();
    worker.postMessage('start');
    worker.onmessage = (event: any) => {
      this.localDateTime = moment(event.data.time)
        .tz(this.localZoneName)
        .format();
      if (this.otherZoneName) {
        this.otherDateTime = moment(event.data.time)
          .tz(this.otherZoneName)
          .format();
      }
    };
  },
  computed: {
    timeDifference(): any {
      if (this.otherDateTime) {
        const localOffset: number = moment.tz(this.localZoneName).utcOffset();
        const otherOffset: number = moment.tz(this.otherZoneName).utcOffset();
        return (otherOffset - localOffset) / 60;
      }
      return null;
    },
  },
  methods: {
    updateTimeFormat(newTimeFormat: string) {
      this.timeFormat = newTimeFormat;
    },
    updateOtherZone(newZoneName: string) {
      if (newZoneName) {
        this.otherZoneName = newZoneName;
      }
    },
  },
});
</script>

<style lang="scss">
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
.App {
  margin: 0 auto;
  max-width: 700px;
  padding: 0 1.2rem;
  width: 100%;

  &-title {
    color: #ffffff;
    font-size: 4.8rem;
    letter-spacing: 1rem;
    line-height: 1;
    margin: 2.4rem 0;
    text-align: center;
    text-shadow: 0 0.1rem 0 #cccccc, 0 0.2rem 0 #c9c9c9, 0 0.3rem 0 #bbbbbb,
      0 0.4rem 0 #b9b9b9, 0 0.5rem 0 #aaaaaa, 0 0.6rem 0.1rem rgba(0, 0, 0, 0.1),
      0 0 0.5rem rgba(0, 0, 0, 0.1), 0 0.1rem 0.3rem rgba(0, 0, 0, 0.3),
      0 0.3rem 0.5rem rgba(0, 0, 0, 0.2), 0 0.5rem 1rem rgba(0, 0, 0, 0.25),
      0 1rem 1rem rgba(0, 0, 0, 0.2), 0 2rem 2rem rgba(0, 0, 0, 0.15);
    text-transform: uppercase;
  }
}
</style>
