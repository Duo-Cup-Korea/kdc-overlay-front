<script setup>
import { secondsToMMSS } from "@/assets/main.js";
import { computed } from "vue";

const props = defineProps({
  cover: String,
  title: String,
  artist: String,
  duration: Number,
  position: Number,
});

const positionFrac = computed(() => (props.position / props.duration) * 100);
const hideDuration = computed(() => positionFrac.value > 90);
const hidePositionBar = computed(() => positionFrac.value < 10);
</script>

<template>
  <div class="master-music-player">
    <div class="line-highlight"></div>
    <div class="content horizontal-box">
      <div class="cover" :style="{ backgroundImage: `url('${cover}')` }"></div>
      <div class="info">
        <div class="title">{{ title }}</div>
        <div class="artist">{{ artist }}</div>
      </div>
    </div>
    <div class="progressBar roboto">
      <div ref="baseRef" class="progressBar-base">
        <div class="progressBar-bg"></div>
        <Transition name="show">
          <span class="progressBar-duration" v-show="!hideDuration">
            {{ secondsToMMSS(duration) }}
          </span>
        </Transition>
      </div>
      <div ref="valueRef" class="progressBar-value" :style="{ width: `${positionFrac}%` }">
        <div class="progressBar-line"></div>
        <span class="progressBar-position">{{ secondsToMMSS(position) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-highlight {
  width: 100%;
}

.content {
  padding: 20px;
}

.cover {
  width: 100px;
  height: 100px;
  background-position: center;
  background-size: cover;
}

.info {
  padding: 20px;
}

.title {
  font-size: 24px;
  font-weight: 900;
}

.artist {
  font-size: 16px;
}

.progressBar {
  position: relative;
  width: 100%;
  font-size: 12px;
  line-height: 25px;
  text-align: right;
}

.progressBar-base {
  position: absolute;
  width: 100%;
}

.progressBar-bg {
  width: 100%;
  background-color: var(--color-line-highlight);
  height: 10px;
}

.show-enter-active {
  animation: fadeIn 0.5s;
}

.show-leave-active {
  animation: fadeIn 0.5s reverse;
}

.progressBar-value {
  position: absolute;
}

.progressBar-line {
  background-color: #ffffff;
  height: 10px;
}

.progressBar-line::after {
  content: "";
  opacity: v-bind("hidePositionBar ? 0 : 1");
  position: absolute;
  right: 0;
  top: 0;
  width: 2px;
  height: 40px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.5) 0%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0) 100%
  );
}

.progressBar-position {
  margin-right: 5px;
}
</style>
