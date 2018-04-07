<template>
  <div class="PleaseWait">
    <div class="PleaseWait-spinner">Loading...</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'please-wait',
});
</script>

<style>
.PleaseWait {
  align-items: center;
  display: flex;
  justify-content: center;
}
.PleaseWait-spinner,
.PleaseWait-spinner:after {
  border-radius: 50%;
  display: inline-block;
  height: 8rem;
  width: 8rem;
}
.PleaseWait-spinner {
  animation: load 1s infinite linear;
  border-bottom: 1rem solid #ffffff30;
  border-left: 1rem solid #ffffff30;
  border-right: 1rem solid #ffffff;
  border-top: 1rem solid #ffffff30;
  overflow: hidden;
  text-indent: -9999em;
  transform: translateZ(0);
}
@keyframes load {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
