<script setup>
import { computed, ref } from "vue";
import { secondsToMMSS } from "@/assets/main.js";

const props = defineProps({
  value: {
    type: [String, Number],
    default: "00:00",
  },
});

const masterRef = ref(null);
const lineHeight = computed(() => {
  if (masterRef.value) {
    return masterRef.value.getBoundingClientRect().height;
  } else {
    return 0;
  }
});

const smaller = computed(() => {
  if (!masterRef.value) {
    return false;
  }
  return masterRef.value.innerHTML.length > 5;
});

const timeLeft = computed(() => {
  if (typeof props.value === "string") {
    return props.value;
  } else {
    if (props.value < 0) {
      return "Starting Soon!";
    }
    return secondsToMMSS(props.value);
  }
});
</script>

<template>
  <div class="master-time-left" ref="masterRef">{{ timeLeft }}</div>
</template>

<style scoped>
.master-time-left {
  width: 400px;
  height: 100%;
  line-height: v-bind("lineHeight + 'px'");
  font-family: "Roboto", sans-serif;
  font-weight: 900;
  font-size: v-bind("smaller ? '56px' : '96px'");
}
</style>
