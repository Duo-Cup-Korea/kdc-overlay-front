<script setup>
import LogoHeader from "@/components/LogoHeader.vue";
import TimeLeft from "@/components/IntroScreen/TopBar/TimeLeft.vue";
import { ref } from "vue";

defineProps({
  showCountdown: Boolean,
});
</script>

<template>
  <div class="master-top-bar horizontal-box">
    <logo-header
      orientation="horizontal"
      text1="Swiss Round 2"
      text2="Mappool Showcase"
    ></logo-header>
    <div style="flex-grow: 1"></div>
    <time-left v-if="showCountdown" class="timer" :value="-1"></time-left>
  </div>
</template>

<style scoped>
.master-top-bar {
  height: 85px;
}

.timer {
  text-align: center;
}
</style>
