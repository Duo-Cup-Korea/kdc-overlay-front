<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  index: Number,
  ratio: {
    type: Array,
    validator(value) {
      return value.length === 2;
    },
  },
});

const masterElem = ref(null);
const positionInfo = computed(() => {
  if (!masterElem.value) {
    return { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0 };
  }
  return masterElem.value.getBoundingClientRect();
});

const computedWidth = computed(() => (positionInfo.value.height * props.ratio[0]) / props.ratio[1]);
</script>

<template>
  <div class="master-client-box" ref="masterElem" :style="{ width: `${computedWidth}px` }">
    <div class="client-index">
      osu!tourney<br />client <b>{{ index }}</b> ({{ ratio[0] }}:{{ ratio[1] }})
    </div>
    <div class="horizontal-box transform">
      <div class="attributes">
        <div>Position</div>
        <div>Rotation</div>
        <div>Size</div>
        <div>Positional<br />Alignment</div>
      </div>
      <div class="values">
        <div>{{ positionInfo.x }}px {{ positionInfo.y }}px</div>
        <div>0.00º</div>
        <div>{{ computedWidth }}px {{ positionInfo.height }}px</div>
        <div>Top Left</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.master-client-box {
  height: 100%;
  width: 480px;
  background: black;
  color: white;
}

.master-client-box:only-child {
  margin: 0 auto;
}

.client-index {
  font-size: 32px;
  margin: 60px 0 40px 60px;
}

.attributes {
  text-align: end;
  width: 30%;
  font-weight: 500;
}

.values {
  font-weight: 300;
}

.attributes > *,
.values > * {
  margin: 10px;
}
</style>
