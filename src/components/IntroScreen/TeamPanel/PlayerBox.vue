<script setup>
import { ref } from "vue";

/* ==========================================
 *          Placeholder Constants
 * ========================================== */
const pfpUrl = ref("https://a.ppy.sh/6665667");
/* ========================================== */
</script>

<template>
  <div class="master-player-box">
    <div class="pfp" :style="{ backgroundImage: `url(${pfpUrl})` }"></div>
    <div class="content">
      <div class="nick">yhsphd</div>
      <div class="line"></div>
      <div class="rank roboto">#14,216</div>
    </div>
  </div>
</template>

<style scoped>
.master-player-box {
  display: flex;
  flex-direction: row;
  width: 346px;
  height: 96px;
  padding: 17px;
  margin-bottom: 10px;
  background-color: var(--color-black-translucent);
}

.pfp {
  width: 96px;
  min-width: 96px;
  height: 96px;
  background-size: cover;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 16px;
  width: 100%;
}

.nick {
  font-size: 32px;
  font-weight: bold;
}

.line {
  width: 100%;
  height: 2px;
  margin: 8px 0 8px 0;
}

.rank {
  font-size: 24px;
  font-weight: normal;
  text-align: right;
}
</style>
