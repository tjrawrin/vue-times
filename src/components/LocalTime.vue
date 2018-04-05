<template>
  <div>
    <h2>{{ currentTimezone }}</h2>
    <span>{{ currentDate }}</span>
    <span>{{ currentTime }}</span>
  </div>
</template>

<script>
import { DateTime } from 'luxon';

export default {
  name: 'local-time',
  data() {
    return {
      currentDateTime: null,
    };
  },
  created() {
    setInterval(() => this.updateCurrentDateTime(), 1000);
  },
  beforeMount() {
    this.updateCurrentDateTime();
  },
  methods: {
    updateCurrentDateTime() {
      this.currentDateTime = DateTime.local();
    },
  },
  computed: {
    currentTimezone() {
      return this.currentDateTime.zoneName;
    },
    currentDate() {
      return this.currentDateTime.toLocaleString(DateTime.DATE_HUGE);
    },
    currentTime() {
      return this.currentDateTime.toLocaleString(DateTime.TIME_WITH_SECONDS);
    },
  },
};
</script>

<style scoped>
div {
  background-color: #ffffff50;
  border-radius: 0.5rem;
  padding: 1.6rem;
}
h2 {
  border-bottom: 1px solid #00000025;
  margin: 0;
  text-align: center;
  text-transform: uppercase;
}
span {
  display: block;
  font-size: 2.4rem;
  text-align: center;
}
</style>
