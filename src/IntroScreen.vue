<script setup>
import { computed, ref } from "vue";
import IntroTopBar from "@/components/IntroScreen/TopBar.vue";
import StreamTitle from "@/components/IntroScreen/StreamTitle.vue";
import MusicPlayer from "@/components/IntroScreen/MusicPlayer.vue";
import TeamPanel from "@/components/IntroScreen/TeamPanel.vue";

const intro = ref(_intro);
const showcase = ref(_showcase);

/* ==========================================
 *          Placeholder Constants
 * ========================================== */
const title = "Swiss Round 2\nMappool Showcase";
const pos = ref(0);
setInterval(() => {
  if (pos.value === 233) {
    pos.value = 0;
  } else {
    pos.value += 1;
  }
}, 30);
/* ========================================== */
</script>

<template>
  <intro-top-bar class="topBar" :show-countdown="intro"></intro-top-bar>
  <stream-title v-if="showcase || !intro" class="title" :value="title"></stream-title>
  <div v-if="!showcase && intro" class="teams horizontal-box">
    <team-panel></team-panel>
    <team-panel></team-panel>
  </div>
  <music-player
    class="player"
    cover="https://www.sonymusic.co.jp/adm_image/common/artist_image/70007000/70007781/jacket_image/279858__220_220_0.jpg?1710982175350"
    title="さもなくば誰がやる"
    artist="緑黄色社会"
    :duration="233"
    :position="pos"
  ></music-player>
</template>

<style scoped>
.topBar {
  margin: 128px;
  width: calc(100% - 128 * 2px);
}

.title {
  position: absolute;
  left: 128px;
  bottom: 128px;
}

.player {
  position: absolute;
  right: 128px;
  bottom: 128px;
  width: 400px;
}

.teams {
  position: absolute;
  left: 128px;
  bottom: 128px;
}
</style>
