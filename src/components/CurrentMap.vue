<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide } from "vue3-carousel";
import { ref } from "vue";

/* ==========================================
 *          Placeholder Constants
 * ========================================== */
const bgUrl = ref("https://assets.ppy.sh/beatmaps/1550315/covers/raw.jpg");
/* ========================================== */
</script>

<template>
  <div class="master-current-map" :style="{ backgroundImage: `url(${bgUrl})` }">
    <div class="bgDim absolute-center"></div>
    <Carousel :autoplay="2000" :wrap-around="true">
      <Slide v-for="slide in 3" :key="slide">
        <p class="carousel__item">
          CS 4.0 / AR 9.6 / OD 9.2 / HP 4.5 / 6.78 ☆ / 07:40 / 110-145 BPM / {{ slide }}
        </p>
      </Slide>
    </Carousel>
  </div>
</template>

<style scoped>
.master-current-map {
  width: 1090px;
  height: 50px;
  background-position: center;
  background-size: cover;
}

.bgDim {
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
