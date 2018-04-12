<template>
  <div class="LocalTime">
    <please-wait v-if="this.dateTime === null"></please-wait>
    <template v-else>
      <div class="LocalTime-zone">{{ getZone }}</div>
      <div class="LocalTime-date">{{ getDate }}</div>
      <div class="LocalTime-time">{{ getTime }}</div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { DateTime } from 'luxon';
import PleaseWait from './PleaseWait.vue';

export default Vue.extend({
  name: 'local-time',
  components: {
    PleaseWait,
  },
  props: {
    dateTime: DateTime,
    format: String,
  },
  computed: {
    getDate(): string {
      return this.dateTime.toLocaleString(DateTime.DATE_HUGE);
    },
    getTime(): string {
      if (this.format === '12hr') {
        return this.dateTime.toLocaleString(DateTime.TIME_WITH_SECONDS);
      } else {
        return this.dateTime.toLocaleString(DateTime.TIME_24_WITH_SECONDS);
      }
    },
    getZone(): string {
      return this.dateTime.zoneName;
    },
  },
});
</script>

<style>
.LocalTime {
  align-items: center;
  background-color: #ffffff30;
  border: 1px solid #00000035;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px #00000025;
  display: flex;
  flex-direction: column;
  grid-column: 2 / 2;
  grid-row: 2 / 2;
  justify-content: center;
  padding: 0.8rem;
}
.LocalTime-zone {
  border-bottom: 1px dotted #00000035;
}
.LocalTime-zone,
.LocalTime-date,
.LocalTime-time {
  text-align: center;
  width: 100%;
}
</style>
