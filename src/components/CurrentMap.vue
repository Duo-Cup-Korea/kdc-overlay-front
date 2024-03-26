<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import { ref } from "vue";

/* ==========================================
 *          Placeholder Constants
 * ========================================== */
const bgUrl = ref("https://assets.ppy.sh/beatmaps/1550315/covers/raw.jpg");
/* ========================================== */
</script>

<template>
  <div
    class="master-current-map"
    :style="{
      background: `linear-gradient(
          rgba(0, 0, 0, 0.7),
          rgba(0, 0, 0, 0.7)
        ),url(${bgUrl})`,
    }"
  >
    <Carousel :autoplay="2000" :wrap-around="true">
      <Slide v-for="slide in 3" :key="slide">
        <div class="carousel__item">
          CS 4.0 / AR 9.6 / OD 9.2 / HP 4.5 / 6.78 ☆ / 07:40 / 110-145 BPM / {{ slide }}
        </div>
      </Slide>
    </Carousel>
  </div>
</template>

<style scoped>
.master-current-map {
  width: 1090px;
  height: 50px;
}
</style>
