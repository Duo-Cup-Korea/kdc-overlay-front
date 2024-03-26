<script setup>
import LogoHeader from "@/components/LogoHeader.vue";
import CurrentMap from "@/components/CurrentMap.vue";
</script>

<template>
  <div class="master-showcase-screen">
    <div class="bg">
      <div class="contentBg"></div>
      <div class="headerWrapper">
        <logo-header
          class="header"
          orientation="vertical"
          text1="Swiss Round 2"
          text2="Mappool Showcase"
        ></logo-header>
      </div>
      <div class="mapIndexWrapper">
        <div class="mapIndex">
          Map <b>{{ 3 }}</b> of {{ 10 }}
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
</style>
