<template>
  <transition name="fade">
    <div class="TimeDifference">
        {{ diffString }}
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'time-difference',
  props: {
    diff: Number,
  },
  computed {
    diffString(): string {
        return `${diff} hour${Math.abs(diff) !== 1 ? 's' : ''} ${diff >= 0 ? 'ahead of' : 'behind'} your current location.`;
    }
  }
});
</script>

<style scoped>
.TimeDifference {
  background-color: #00000015;
  border: 1px solid #00000065;
  border-radius: 0.5rem;
  box-shadow: 0 1px 4px #00000025;
  margin: -1.6rem 0;
  padding: 0.8rem;
  text-align: center;
}
.fade-enter-active {
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-name: fade;
}
.fade-leave-active {
  animation-direction: reverse;
  animation-duration: 0.5s;
  animation-fill-mode: both;
  animation-name: fade;
}
@keyframes fade {
  from {
    opacity: 0;
    transform: translate3d(0, -1rem, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
</style>
