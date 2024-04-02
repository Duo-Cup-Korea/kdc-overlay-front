<script setup>
import { ref } from "vue";
import RoundBox from "@/components/RoundBox.vue";

defineProps({
  idle: Boolean,
});

/* ==========================================
 *          Placeholder Constants
 * ========================================== */
const rows = ref(new Array(6));
/* ========================================== */
</script>

<template>
  <div class="master-phase-overview">
    <div class="header row">
      Phase <b>{{ 1 }}</b>
    </div>
    <div class="line-highlight"></div>
    <div class="horizontal-box row labels">
      <div class="cell fixed">Pick</div>
      <div class="cell">Map</div>
      <div class="cell fixed">Win</div>
    </div>
    <!--Iteration-->
    <div v-for="item in rows" :key="row">
      <div class="line"></div>
      <div class="horizontal-box row">
        <div class="cell fixed">
          <div class="colorBox red"></div>
        </div>
        <div class="cell horizontal-box">
          <round-box
            class="code"
            :value="`HD1`"
            :color="`var(--color-blue-translucent)`"
          ></round-box>
          <Transition name="titleAnim">
            <p v-show="idle" class="title">Korekara no Koto, Sorekara no Koto</p>
          </Transition>
        </div>
        <div class="cell fixed">
          <div class="winCircle playing">
            <svg class="absolute-center" width="12" height="14" viewBox="0 0 12 14" fill="none">
              <path d="M11.7627 6.77808L0.512695 13.2733V0.282886L11.7627 6.77808Z" fill="white" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <!---->
    <div class="line-highlight"></div>
  </div>
</template>

<style scoped>
.master-phase-overview {
  width: 100%;
  font-size: 20px;
  margin-bottom: 10px;
}

.line,
.line-highlight {
  width: 100%;
}

.header {
  font-size: 24px;
}

.labels {
  text-align: center;
}

.row {
  height: 40px;
}

.cell {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cell.fixed {
  flex-grow: unset;
  width: 90px;
}

.colorBox {
  width: 60px;
  height: 10px;
}

.red {
  background-color: var(--color-red-translucent);
}

.blue {
  background-color: var(--color-blue-translucent);
}

.code {
  width: 70px;
  height: 30px;
}

.title {
  width: 0;
  flex-grow: 1;
  margin-left: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.titleAnim-enter-active {
  animation: titleAnim 1s ease;
}

.titleAnim-leave-active {
  animation: titleAnim 1s ease reverse;
}

@keyframes titleAnim {
  0% {
    margin-left: 0;
    opacity: 0;
    flex-grow: 0;
  }
  100% {
    margin-left: 20px;
    opacity: 1;
    flex-grow: 1;
  }
}

.winCircle {
  position: relative;
  border-radius: 9999px;
  width: 30px;
  height: 30px;
}

.winCircle > * {
  opacity: 0;
}

.winCircle.playing {
  background-color: var(--color-line-highlight);
}

.winCircle.playing > * {
  opacity: 1;
}
</style>
