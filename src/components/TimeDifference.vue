<template>
  <div class="TimeDifference">
    <template v-if="diff >= 0">
      {{ diff }} hour{{ diff === 1 ? '' : 's' }} ahead of your current location
    </template>
    <template v-if="diff < 0">
      {{ Math.abs(diff) }} hour{{ diff === -1 ? '' : 's' }} behind of your current location
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'time-difference',
  props: {
    diff: Number,
  },
});
</script>

<style scoped>
.TimeDifference {
  background-color: #00000015;
  border: 1px solid #00000065;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px #00000025;
  margin: -1.6rem 0;
  padding: 0.8rem;
  text-align: center;
}
</style>
