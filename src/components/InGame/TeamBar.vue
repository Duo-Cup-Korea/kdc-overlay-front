<script setup>
import { computed } from "vue";
import StarComponent from "@/components/InGame/TeamBar/StarComponent.vue";
import RoundBox from "@/components/RoundBox.vue";
import { useOverlayDataStore } from "@/socket.js";

const state = useOverlayDataStore();

const props = defineProps({
  teamIndex: {
    type: Number,
    default: 0,
  },
});

const teamInfo = computed(() => state.data?.teams?.[props.teamIndex]);
const stars = computed(() => {
  if (!state.data?.lobby || !state.data.lobby.bo) {
    return [];
  }

  const slots = (state.data.lobby.bo + 1) / 2;
  const point = state.data.lobby.set_scores[props.teamIndex];

  const stars = new Array(slots);

  for (let i = 0; i < point; i++) {
    stars[i] = true;
  }
  return stars;
});
</script>

<template>
  <div class="master-team-bar horizontal-box">
    <round-box
      :color="teamIndex ? 'blue' : 'red'"
      :value="teamInfo?.acronym"
      class="acronym"
    ></round-box>
    <div class="teamName">{{ teamInfo?.name }}</div>
    <div :style="{ flexGrow: 1 }"></div>
    <div class="stars horizontal-box">
      <star-component v-for="(item, i) in stars" :value="item" :key="i"></star-component>
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
