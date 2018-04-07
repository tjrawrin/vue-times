<template>
  <div class="LocalTime">
    <please-wait v-if="this.$store.state.local.loading"></please-wait>
    <template v-else>
      <div class="LocalTime-zone">{{ this.$store.state.local.zone }}</div>
      <div class="LocalTime-date">{{ this.$store.state.local.date }}</div>
      <div class="LocalTime-time">{{ this.$store.state.local.time }}</div>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import PleaseWait from './PleaseWait.vue';

export default Vue.extend({
  name: 'local-time',
  components: {
    PleaseWait,
  },
  beforeCreate() {
    setInterval(() => {
      this.$store.dispatch('updateLocal');
    }, 1000 * 1);
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
