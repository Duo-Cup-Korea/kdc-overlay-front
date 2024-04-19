<script setup>
import { useOverlayDataStore } from "@/socket.js";
import { computed, ref } from "vue";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { secondsToMMSS, teamName2acronym, teamName2color } from "../assets/main.js";
import RoundBox from "@/components/RoundBox.vue";

const state = useOverlayDataStore();

const np = computed(() => state.data?.now_playing?.osu);
const bgUrl = computed(
  () => `https://assets.ppy.sh/beatmaps/${np.value?.mapset_id}/covers/slimcover.jpg`
);
const currentMapPicker = computed(() => {
  // [teamName, acronym]
  const code = np.value?.code;
  let data = ["", ""];

  if (!code) {
    return data;
  }

  const phases = state.data?.progress.phases;
  for (let i = 0; i < phases.length; i++) {
    for (let j = 0; j < phases[i].order.length; j++) {
      if (phases[i].order[j].code === code) {
        data[0] = phases[i].order[j].team;
        data[1] = teamName2acronym(state.data, phases[i].order[j].team);
        return data;
      }
    }
  }
  return data;
});
const activePages = computed(() => {
  if (currentMapPicker.value[0]) {
    return ["metadata", "title", "pick"];
  } else {
    return ["metadata", "title"];
  }
});
</script>

<template>
  <div class="master-current-map" :style="{ backgroundImage: `url(${bgUrl})` }">
    <div class="bgDim absolute-center"></div>
    <div class="carouselWrapper">
      <Carousel :autoplay="2000" :wrap-around="true">
        <Slide v-for="slide in activePages" :key="slide">
          <div class="carousel__item metadata" v-if="slide === 'metadata'">
            CS&nbsp;<b>{{ np?.stats.modified.cs.toFixed(1) }}</b
            >&nbsp;/&nbsp;AR&nbsp; <b>{{ np?.stats.modified.ar.toFixed(1) }}</b
            >&nbsp;/&nbsp;OD&nbsp; <b>{{ np?.stats.modified.od.toFixed(1) }}</b
            >&nbsp;/&nbsp;HP&nbsp; <b>{{ np?.stats.modified.hp.toFixed(1) }}</b
            >&nbsp;/&nbsp; <b>{{ np?.stats.modified.sr.toFixed(2) }}</b> ☆&nbsp;/&nbsp;
            <b>{{ secondsToMMSS(np?.stats.modified.length / 1000) }}</b
            >&nbsp;/&nbsp; <b>{{ np?.stats.modified.bpm }}</b
            >&nbsp;BPM
          </div>
          <div class="carousel__item vertical-center" v-if="slide === 'title'">
            <round-box v-if="np?.code" mode="code" :value="np?.code" class="roundBox"></round-box>
            <b>{{ np?.artist }}</b
            >&nbsp;-&nbsp;<b>{{ np?.title }}</b
            >&nbsp;[{{ np?.difficulty }}]&nbsp;by&nbsp;{{ np?.mapper }}
          </div>
          <div class="carousel__item vertical-center" v-if="slide === 'pick'">
            <b>Picked</b>&nbsp;by:
            <round-box mode="acronym" :value="currentMapPicker[1]" class="roundBox"></round-box>
            {{ currentMapPicker[0] }}
          </div>
        </Slide>
      </Carousel>
    </div>
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

.carouselWrapper {
  height: 50px;
  font-size: 20px;
}

.metadata {
  line-height: 50px;
}

.roundBox {
  height: 30px;
  width: 50px;
  margin: 0 10px 0 10px;
}
</style>
