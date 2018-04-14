<template>
  <div class="TimeZoneSearch" :class="{'TimeZoneSearch--open': openSuggestion}">
    <input
      class="TimeZoneSearch-input"
      placeholder="Search for a city..."
      type="text"
      :value="value"
      @input="updateValue($event.target.value)"
      @keydown.enter="enter(currentIndex)"
      @keydown.down="down"
      @keydown.up="up">
    <ul class="TimeZoneSearch-list">
      <li
        v-for="(suggestion, index) in matches"
        class="TimeZoneSearch-item"
        :class="{'TimeZoneSearch-item--active': isActive(index)}"
        :key="suggestion"
        @click="suggestionClick(index)"><span>{{ suggestion }}</span></li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import moment from 'moment-timezone';

import { escapeRegExp } from '../helpers';

export default Vue.extend({
  name: 'time-zone-search',
  data() {
    return {
      currentIndex: 0,
      open: false,
      value: '',
      zoneNames: moment.tz.names(),
    };
  },
  computed: {
    matches(): string[] {
      return this.zoneNames
        .filter((name: any) => {
          return name.match(new RegExp(escapeRegExp(this.value), 'gi'));
        })
        .slice(0, 4);
    },
    openSuggestion(): boolean {
      return (
        this.value !== '' && this.matches.length !== 0 && this.open === true
      );
    },
  },
  methods: {
    down() {
      if (this.currentIndex < this.matches.length - 1) {
        this.currentIndex++;
      }
    },
    enter(index: number) {
      this.$emit('update', this.matches[index]);
      this.value = '';
      this.open = false;
    },
    isActive(index: number): boolean {
      return index === this.currentIndex;
    },
    up() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    suggestionClick(index: number) {
      this.$emit('update', this.matches[index]);
      this.value = '';
      this.open = false;
    },
    updateValue(value: string) {
      if (this.open === false) {
        this.open = true;
        this.currentIndex = 0;
      }
      this.value = value;
    },
  },
});
</script>

<style scoped>
.TimeZoneSearch {
  margin: 2.4rem 0;
  position: relative;
}
.TimeZoneSearch ul {
  display: none;
}
.TimeZoneSearch--open ul {
  display: block;
}
.TimeZoneSearch-input {
  background-color: #ffffff15;
  border: 1px solid #00000065;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px #00000025;
  color: #333333;
  font-size: 1.6rem;
  margin-bottom: 0.2rem;
  outline: 0;
  padding: 0.8rem;
  width: 100%;
}
.TimeZoneSearch-list {
  background-color: #ffffff15;
  border: 1px solid #00000065;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px #00000025;
  margin: 0;
  max-height: 12.8rem;
  overflow: hidden;
  padding: 0.8rem;
}
.TimeZoneSearch-item {
  list-style-type: none;
}
.TimeZoneSearch-item span {
  cursor: pointer;
  display: block;
  margin: 0 -0.8rem;
  padding: 0 0.8rem;
}
.TimeZoneSearch-item--active span {
  background-color: #00c9ff60;
}
</style>
