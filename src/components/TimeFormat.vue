<template>
  <div>
    <input 
      type="radio" 
      name="format"
      id="12hr">
    <label for="12hr">12hr</label>
    <input
      type="radio"
      name="format"
      id="24hr"
      value="24hr">
    <label for="24hr">24hr</label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'time-format',
});
</script>

<style scoped>

</style>
