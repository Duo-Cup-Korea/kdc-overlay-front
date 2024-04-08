<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import RoundBox from "@/components/RoundBox.vue";
import { ref } from "vue";

/* ==========================================
 *          Placeholder Constants
 * ========================================== */
const players = ref([
  { id: 6665667, nick: "yhsphd" },
  { id: 4585186, nick: "Nopekjk" },
]);
/* ========================================== */
</script>

<template>
  <div class="master-team-box">
    <Carousel :autoplay="3000" :wrap-around="true">
      <Slide v-for="slide in 1" :key="slide">
        <div class="carousel__item">
          <div class="item horizontal-box">
            <round-box color="red" value="MZ" class="acronym"></round-box>
            <p class="teamName">Never Gonna Give You Up</p>
          </div>
        </div>
      </Slide>
      <Slide v-for="slide in 1" :key="slide">
        <div class="carousel__item">
          <div class="player horizontal-box" v-for="(player, i) in players" :key="i">
            <div
              class="pfp"
              :style="{ backgroundImage: `url(https://a.ppy.sh/${player.id})` }"
            ></div>
            <div class="nick">{{ player.nick }}</div>
          </div>
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<style scoped>
.master-team-box {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item {
  align-items: center;
}

.acronym {
  width: 70px;
  min-width: 70px;
  height: 40px;
  margin: 10px;
}

.teamName {
  font-size: 32px;
  font-weight: bold;
  text-align: left;
  margin-right: 20px;
}

.player {
  margin: 16px;
  width: 350px;
  height: 48px;
}

.pfp {
  margin: 0 16px 0 16px;
  width: 48px;
  min-width: 48px;
  height: 48px;
  background-position: center;
  background-size: cover;
}

.nick {
  font-size: 24px;
  line-height: 48px;
}
</style>
