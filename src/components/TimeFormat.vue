<template>
  <div class="TimeFormat">
    <input 
      type="radio" 
      name="format"
      id="12hr"
      :checked="this.$store.state.format === '12hr'"
      @change="updateFormat('12hr')">
    <label for="12hr">12hr</label>
    <input
      type="radio"
      name="format"
      id="24hr"
      value="24hr"
      :checked="this.$store.state.format === '24hr'"
      @change="updateFormat('24hr')">
    <label for="24hr">24hr</label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'time-format',
  methods: {
    ...mapActions(['updateFormat']),
  },
});
</script>

<style>
.TimeFormat {
  grid-column: 2 / span 2;
  justify-self: center;
}
</style>
