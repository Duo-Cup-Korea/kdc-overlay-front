<script setup>
import { computed, ref, watch } from "vue";
import LogoHeader from "@/components/LogoHeader.vue";
import TeamBar from "@/components/InGame/TeamBar.vue";
import CurrentMap from "@/components/CurrentMap.vue";
import ClientBox from "@/components/InGame/ClientBox.vue";
import ScoreBar from "@/components/InGame/ScoreBar.vue";
import PhaseOverview from "@/components/InGame/PhaseOverview.vue";
import LobbyChatBox from "@/components/InGame/LobbyChatBox.vue";
import { socket, useOverlayDataStore } from "@/socket.js";

const state = useOverlayDataStore();
socket.off(); // remove any existing listeners (after a hot module replacement)
state.bindEvents();
state.connect();

const clientIndex = computed(() =>
  [...Array(clientTeamSize.value * 2)].map((_, i) => {
    return i;
  })
);
const clientRatio = computed(() => {
  if (clientTeamSize.value === 2) {
    return [4 * aspect.value, 3];
  }
  return [4, 3];
});

const aspect = computed(() => state.data?.lobby?.aspect);
const clientTeamSize = computed(() => {
  // Half of the total clients count
  if (state.data?.lobby?.players) {
    return Math.trunc(state.data?.lobby?.players.length / 2);
  }
  return 1;
});
// In KDC24, teamSize is not determined by client count, but by the aspect.
// Because for the spectating slots to be open in widescreen in 1vs1,
// we have to use the aspect feature of the tournament client, which is only available in 2vs2 mode.
const teamSize = computed(() => (aspect.value === 1 ? 2 : 1));

const idle = ref(false);
const masterWidth = computed(() => (idle.value ? "1130px" : "1440px"));
const tourneyState = computed(() => state.data?.progress?.state);
watch(tourneyState, (newState, oldState) => {
  if (newState === 1) {
    // idle
    idle.value = true;
  } else if (newState === 3) {
    // playing
    idle.value = false;
  }

  if (oldState === 3 && newState === 4) {
    // playing -> result
    setTimeout(() => {
      idle.value = true;
    }, 10000);
  }
});
</script>

<template>
  <div class="master-ingame">
    <div class="container horizontal-box absolute-center">
      <div class="masterBox" :style="{ width: masterWidth }">
        <!--Red Players Region-->
        <div class="area horizontal-box" :style="{ top: '10px' }">
          <div class="decoLine">
            <div :style="{ backgroundColor: 'var(--color-red-translucent)' }"></div>
          </div>
          <div class="clientBg horizontal-box">
            <client-box
              v-for="item in clientIndex.slice(0, clientTeamSize)"
              :key="item"
              :index="item"
              :ratio="clientRatio"
              :teamSize="teamSize"
            ></client-box>
          </div>
        </div>

        <!--Blue Players Region-->
        <div class="area horizontal-box" :style="{ bottom: '10px', alignItems: 'flex-end' }">
          <div class="decoLine">
            <div :style="{ backgroundColor: 'var(--color-blue-translucent)' }"></div>
          </div>
          <div class="clientBg horizontal-box">
            <client-box
              v-for="item in clientIndex.slice(clientTeamSize)"
              :key="item"
              :index="item"
              :ratio="clientRatio"
              :teamSize="teamSize"
            ></client-box>
          </div>
        </div>

        <!--NowPlaying Region-->
        <current-map class="nowPlaying"></current-map>

        <!--ScoreBar Region-->
        <div class="scoreBarBgWrapper">
          <div class="scoreBarBg" :style="{ opacity: idle ? 0 : 1 }">
            <score-bar :teamSize="teamSize"></score-bar>
          </div>
        </div>

        <!--Team Acronym, Team Name, Team Points-->
        <team-bar class="teamBar red" :teamIndex="0"></team-bar>
        <team-bar class="teamBar blue" :teamIndex="1"></team-bar>
      </div>
      <div class="masterBoxRightBorder"></div>
      <div class="subBox">
        <!--Tournament Header-->
        <logo-header
          class="header"
          orientation="vertical"
          text1="Swiss Round 2"
          text2="Match 8"
        ></logo-header>
        <!--Lobby Chat-->
        <lobby-chat-box class="chatBox" :style="{ opacity: idle ? 1 : 0 }"></lobby-chat-box>
        <!--Phase View-->
        <phase-overview :idle="idle"></phase-overview>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: calc(100% - 80px);
  height: 900px;
}

.masterBox {
  position: relative;
  height: 100%;
  background-color: var(--color-white-translucent);
  transition: width 1s ease;
}

.masterBoxRightBorder {
  height: 100%;
  width: 10px;
  background-color: var(--color-white-translucent);
}

.area {
  position: absolute;
  left: 10px;
  height: 405px;
}

.decoLine {
  position: relative;
  width: 20px;
  height: 435px;
  background-color: black;
}

.decoLine > div {
  width: 100%;
  height: 100%;
}

.clientBg {
  margin-left: 10px;
  width: 1090px;
  height: 405px;
  background-color: var(--color-black-translucent);
  justify-content: space-between;
}

.scoreBarBgWrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.scoreBarBg {
  position: absolute;
  top: 10px;
  left: 1140px;
  width: 300px;
  height: 880px;
  background-color: var(--color-black-translucent);
  transition: opacity 1s ease;
}

.nowPlaying {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 40px;
}

.teamBar {
  position: absolute;
  width: 1124px;
  height: 50px;
}

.teamBar.red {
  top: -72px;
}

.teamBar.blue {
  bottom: -72px;
}

.subBox {
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 40px;
  justify-content: space-between;
}

.header {
  margin-top: 10px;
}

.chatBox {
  transition: opacity 500ms ease-in-out;
}
</style>
