<script setup>
import { ref } from "vue";
import StarComponent from "@/components/InGame/TeamBar/StarComponent.vue";
import RoundBox from "@/components/RoundBox.vue";

/* ==========================================
 *          Placeholder Constants
 * ========================================== */
const _stars = ref(["", "", "", "", "", ""]);
const teamName = ref("Never Gonna Give You Up");
/* ========================================== */
</script>

<template>
  <div class="master-team-bar horizontal-box">
    <round-box color="red" value="MZ" class="acronym"></round-box>
    <div class="teamName">{{ teamName }}</div>
    <div :style="{ flexGrow: 1 }"></div>
    <div class="stars horizontal-box">
      <star-component v-for="(item, i) in _stars" :key="i"></star-component>
    </div>
  </div>
</template>

<style scoped>
.master-team-bar {
  align-items: center;
}

.acronym {
  margin-left: 10px;
  width: 100px;
  height: 50px;
}

.teamName {
  font-size: 40px;
  font-weight: bold;
  margin-left: 40px;
}
</style>
