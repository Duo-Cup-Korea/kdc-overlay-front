<script setup>
import { computed } from "vue";

const props = defineProps({
  name: String,
  source: HTMLDivElement,
});

const positionInfo = computed(() => {
  if (!props.source) {
    return { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0 };
  }
  return props.source.getBoundingClientRect();
});
</script>

<template>
  <div class="master-dimension-info">
    <div class="title">
      <div v-html="name"></div>
    </div>
    <div class="horizontal-box transform">
      <div class="attributes">
        <div>Position</div>
        <div>Rotation</div>
        <div>Size</div>
        <div>Positional<br />Alignment</div>
      </div>
      <div class="values">
        <div>{{ positionInfo.x }}px / {{ positionInfo.y }}px</div>
        <div>0.00º</div>
        <div>{{ positionInfo.width }}px / {{ positionInfo.height }}px</div>
        <div>Top Left</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: 32px;
  text-align: left;
  background: white;
  color: black;
  padding: 10px 10px 10px 40px;
  margin-bottom: 20px;
  font-weight: bold;
}

.attributes {
  text-align: end;
  width: 200px;
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
