<script setup>
import { socket, useOverlayDataStore } from "@/socket.js";
import LogoHeader from "@/components/LogoHeader.vue";
import CurrentMap from "@/components/CurrentMap.vue";
import { computed, ref } from "vue";
import DimensionInfo from "@/components/DimensionInfo.vue";

const state = useOverlayDataStore();
socket.off(); // remove any existing listeners (after a hot module replacement)
state.bindEvents();
state.connect();

const totalMapCount = computed(() => state.data.mappool?.length);
const mapIndex = computed(() => {
  if (!state.data?.mappool?.length) {
    return 0;
  }

  for (let i = 0; i < state.data.mappool.length; i++) {
    if (state.data.now_playing.osu.code === state.data.mappool[i].code) {
      return i + 1;
    }
  }

  return 0;
});

const contentBg_ref = ref(null);
</script>

<template>
  <div class="master-showcase-screen">
    <div class="bg">
      <div class="contentBg" ref="contentBg_ref">
        <dimension-info
          class="dimensions"
          name="Screen/osu!<br>Capture"
          :source="contentBg_ref"
        ></dimension-info>
      </div>
      <div class="headerWrapper">
        <logo-header class="header" orientation="vertical"></logo-header>
      </div>
      <div class="mapIndexWrapper">
        <div class="mapIndex" :style="{ opacity: mapIndex ? 1 : 0 }">
          Map <b>{{ mapIndex }}</b> of {{ totalMapCount }}
        </div>
      </div>
      <div class="nowPlayingWrapper">
        <current-map class="nowPlaying"></current-map>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  position: absolute;
  left: 40px;
  top: 80px;
  width: 1440px;
  height: 810px;
  padding: 10px;
  background-color: var(--color-white-translucent);
  white-space: nowrap;
}

.contentBg {
  width: 1440px;
  height: 810px;
  background-color: var(--color-black-translucent);
}

.headerWrapper {
  position: absolute;
  right: 0;
  top: 0;
}

.header {
  position: absolute;
  top: 50px;
  left: 40px;
}

.mapIndexWrapper {
  position: absolute;
  right: 0;
  bottom: 0;
}

.mapIndex {
  position: absolute;
  bottom: 20px;
  left: 40px;
  font-size: 24px;
  transition: opacity 1s;
}

.nowPlayingWrapper {
  position: absolute;
  width: 100%;
  bottom: 0;
}

.nowPlaying {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
}

.dimensions {
  position: absolute;
  left: 200px;
  top: 80px;
}
</style>
