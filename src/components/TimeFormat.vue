<template>
  <div class="TimeFormat">
    <input 
      class="TimeFormat-input"
      type="radio" 
      name="format"
      id="12hr"
      :checked="format === '12hr'"
      @change="updateFormat('12hr')">
    <label class="TimeFormat-label" for="12hr">12hr</label>
    <input
      class="TimeFormat-input"
      type="radio"
      name="format"
      id="24hr"
      value="24hr"
      :checked="format === '24hr'"
      @change="updateFormat('24hr')">
    <label class="TimeFormat-label" for="24hr">24hr</label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'time-format',
  props: {
    format: String,
  },
  methods: {
    updateFormat(format: string) {
      this.$emit('update', format);
    },
  },
});
</script>

<style>
.TimeFormat {
  grid-column: 2 / span 2;
  justify-self: center;
}
.TimeFormat-input {
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
}
.TimeFormat-input:checked + label {
  background-color: #00c9ff60;
}
.TimeFormat-label {
  background-color: #ffffff30;
  border: 1px solid #00000035;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px #00000025;
  cursor: pointer;
  display: inline-block;
  margin: 0 1rem;
  padding: 1rem 3.2rem;
}
.TimeFormat-label:hover {
  background-color: #00c9ff60;
}
</style>
