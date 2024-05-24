<script setup>
import { computed } from "vue";
import { useOverlayDataStore } from "@/socket.js";
import { splitCode } from "@/assets/main.js";

const state = useOverlayDataStore();

const mappool = computed(() => state.data?.mappool);
const maps = computed(() => {
  // [mod, index, title]
  const data = [];
  mappool.value?.forEach((map) => {
    data.push([...splitCode(map.code), map.title]);
  });
  return data;
});

const columns = computed(() => {
  let columns = [];
  let column = [];

  for (let i = 0; i < maps.value.length; i++) {
    let currentMod = maps.value[i][0];

    // TB will be added at the end of DTs
    if (currentMod !== "TB") {
      column.push(maps.value[i]);
    }

    // Line Break Condition 1: not the last map
    if (i !== maps.value.length - 1) {
      let nextMod = maps.value[i + 1][0];

      if (
        currentMod !== nextMod && // Condition 2: mod changed
        !(currentMod === "HD" && nextMod === "HR") && // Condition 3: HDs and HRs should be in the same column
        !(currentMod === "FM" && nextMod === "FcM") // Condition 4: same for FMs and FcMs
      ) {
        // Add TB at the end of DTs before proceeding to the next column
        if (currentMod === "DT" && maps.value.slice(-1)[0][0] === "TB") {
          column.push(maps.value.slice(-1)[0]);
        }

        // Column completed
        columns.push(column.slice());
        column = [];
      }
    }
  }
  // Push remaining column if exists
  if (column.length !== 0) {
    columns.push(column.slice());
  }

  return columns;
});

const progress = computed(() => state.data.progress);
const unavailableMaps = computed(() =>
  progress.value.phases
    .map((x) => x.order)
    .flat(1)
    .map((x) => x.code)
);
</script>

<template>
  <div class="master-map-list horizontal-box">
    <div class="column" v-for="(column, i) in columns" :key="i">
      <div
        class="maps"
        v-for="(map, j) in column"
        :key="j"
        :style="{ flexGrow: `${map[0] === 'TB' ? 1 : 0}` }"
      >
        <div
          class="map horizontal-box"
          :class="{
            unavailable: unavailableMaps.includes(map[0] + (map[0] === 'TB' ? '' : map[1])),
          }"
        >
          <div class="code roboto" :style="{ color: `var(--color-${map[0]}` }">
            {{ map[0] + (map[0] === "TB" ? "" : map[1]) }}
          </div>
          <div class="divider"></div>
          <div class="title">{{ map[2] }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.master-map-list {
  height: 240px;
  padding: 0 20px 0 20px;
  flex-wrap: wrap;
}

.column {
  max-width: 25%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.maps {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.map {
  height: 40px;
  align-items: center;
  transition: opacity 0.5s;
}

.map.unavailable {
  opacity: 0.5;
}

.code {
  font-size: 36px;
  width: 100px;
  min-width: 100px;
  text-align: right;
}

.divider {
  height: 30px;
  margin: 0 10px 0 10px;
  width: 2px;
  background-color: var(--color-line-highlight);
}

.title {
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
