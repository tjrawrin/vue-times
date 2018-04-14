<template>
  <div class="TimeCard">
    <please-wait v-if="!this.dt"></please-wait>
    <template v-else>
      <div class="TimeCard-location">{{ location }}</div>
      <div class="TimeCard-date">{{ date }}</div>
      <div class="TimeCard-time">{{ time }}</div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment-timezone';

import PleaseWait from './PleaseWait.vue';

export default Vue.extend({
  components: {
    PleaseWait,
  },
  name: 'time-card',
  props: {
    dt: String,
    tf: {
      default: '12hr',
      type: String,
    },
    zn: String,
  },
  computed: {
    date(): string {
      return moment.tz(this.dt, this.zn).format('dddd, MMMM Do YYYY');
    },
    location(): string {
      return this.zn.replace(/\//g, ' / ').replace(/_/g, ' ');
    },
    time(): string {
      if (this.tf === '12hr') {
        return moment.tz(this.dt, this.zn).format('hh:mm:ss A');
      } else {
        return moment.tz(this.dt, this.zn).format('HH:mm:ss');
      }
    },
  },
});
</script>

<style scoped>
.TimeCard {
  background-color: #00000015;
  border: 1px solid #00000065;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px #00000025;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 2.4rem 0;
  min-height: 12.8rem;
  padding: 0.8rem;
}
.TimeCard-location {
  border-bottom: 1px solid #00000065;
}
.TimeCard-location,
.TimeCard-date,
.TimeCard-time {
  text-align: center;
  width: 100%;
}
</style>
