<script setup>
import { ref } from "vue";

// 비율 배분 시스템 코딩필요

/* ==========================================
 *          Placeholder Constants
 * ========================================== */
const redTeamProportion = ref("0.6");
const redLeaderProportion = ref("0.6"); // LeaderProportion: 1vs1 상황에서는 1로
const blueLeaderProportion = ref("0.5");
const teamSize = ref(2);
/* ========================================== */
</script>

<template>
  <div class="master-score-bar roboto">
    <!--Middle Point-->
    <div class="middlePoint horizontal-box">
      <div class="middleLine"></div>
      <svg width="8" height="10" viewBox="0 0 8 10" fill="none">
        <path d="M0 5L7.5 0.669872L7.5 9.33013L0 5Z" fill="white" />
      </svg>
    </div>

    <!--Bars-->
    <div class="bar red" :style="{ height: `${redTeamProportion * 100}%` }">
      <div class="bar subBar red" :style="{ height: `${redLeaderProportion * 100}%` }">
        <div v-if="teamSize === 2" class="divider sub" :style="{ bottom: 0 }">
          <div class="individualScore upper"><b>#1 yhsphd</b><br />800,000 / x727 / 98.01%</div>
          <div class="individualScore lower"><b>#1 yhsphd</b><br />800,000 / x727 / 98.01%</div>
        </div>
      </div>
    </div>
    <div class="divider" :style="{ top: `calc(${redTeamProportion * 100}% - 1px)` }">
      <div class="scoreContainer red leading">
        <div class="scoreDiff red">+200,000</div>
        <div class="scoreSum red">1,400,000</div>
      </div>
      <div class="scoreContainer blue">
        <div class="scoreSum blue">1,200,000</div>
        <div class="scoreDiff blue">-200,000</div>
      </div>
    </div>
    <div class="bar blue" :style="{ height: `${(1 - redTeamProportion) * 100}%` }">
      <div class="bar subBar blue" :style="{ height: `${blueLeaderProportion * 100}%` }">
        <div v-if="teamSize === 2" class="divider sub" :style="{ top: 0 }">
          <div class="individualScore upper"><b>#1 yhsphd</b><br />800,000 / x727 / 98.01%</div>
          <div class="individualScore lower"><b>#1 yhsphd</b><br />800,000 / x727 / 98.01%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.master-score-bar {
  position: relative;
  width: 100%;
  height: 100%;
}

.middlePoint {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  align-items: center;
}

.middleLine {
  width: 20px;
  height: 2px;
  background-color: var(--color-white-translucent);
}

.bar {
  position: absolute;
  left: 0;
  width: 20px;
}

.bar.red {
  top: 0;
  background-color: var(--color-red-translucent);
}

.bar.blue {
  bottom: 0;
  background-color: var(--color-blue-translucent);
}

.bar.red.subBar {
  background-color: var(--color-red);
}

.bar.blue.subBar {
  background-color: var(--color-blue);
}

.divider {
  position: absolute;
  height: 2px;
  width: 240px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%);
}

.scoreContainer {
  position: absolute;
  left: 50px;
}

.scoreContainer.red {
  bottom: 10px;
  color: var(--color-red);
}

.scoreContainer.blue {
  top: 10px;
  color: var(--color-blue);
}

.scoreSum {
  font-size: 32px;
}

.scoreDiff {
  opacity: 0;
  font-size: 24px;
}

.leading > .scoreSum {
  font-size: 40px;
  font-weight: bold;
}

.leading > .scoreDiff {
  opacity: 1;
}

.divider.sub {
  width: 100px;
}

.individualScore {
  position: absolute;
  left: 40px;
  font-size: 16px;
  white-space: nowrap;
}

.individualScore.upper {
  bottom: 5px;
}

.individualScore.lower {
  top: 5px;
}
</style>
