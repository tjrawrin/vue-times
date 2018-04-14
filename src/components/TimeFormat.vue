<template>
  <ul class="TimeFormat">
    <li class="TimeFormat-item">
      <input 
        class="TimeFormat-input"
        type="radio" 
        name="format"
        id="12"
        :checked="tf === '12hr'"
        @change="updateFormat('12hr')">
      <label class="TimeFormat-label" for="12">12</label>
    </li>
    <li class="TimeFormat-item">
      <input
        class="TimeFormat-input"
        type="radio"
        name="format"
        id="24"
        value="24hr"
        :checked="tf === '24hr'"
        @change="updateFormat('24hr')">
      <label class="TimeFormat-label" for="24">24</label>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'time-format',
  props: {
    tf: String,
  },
  methods: {
    updateFormat(newTimeFormat: string) {
      this.$emit('update', newTimeFormat);
    },
  },
});
</script>

<style scoped>
.TimeFormat {
  margin: 2.4rem 0;
  padding: 0;
}
.TimeFormat-item {
  display: inline-block;
  margin-right: 1.2rem;
}
.TimeFormat-item:last-of-type {
  margin-right: 0;
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
  background-color: #00000015;
  border: 1px solid #00000065;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px #00000025;
  cursor: pointer;
  display: inline-block;
  padding: 0.2rem 2.4rem;
}
.TimeFormat-label:hover {
  background-color: #00c9ff60;
}
</style>
