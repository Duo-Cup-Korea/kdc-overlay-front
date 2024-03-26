<script setup>
import logoUrl from "@/assets/logo.png";
import { ref } from "vue";

const props = defineProps({
  tournamentName: {
    type: String,
    default: "Duo Cup: Korea 2024",
  },
  text1: String,
  text1Bold: {
    type: Boolean,
    default: false,
  },
  text2: String,
  text2Bold: {
    type: Boolean,
    default: true,
  },
  orientation: {
    type: String,
    validator: (value) => ["vertical", "horizontal"].includes(value),
  },
});

const horizontal = ref(props.orientation === "horizontal");
</script>

<template>
  <div class="master-logo-header" :class="{ 'horizontal-box': horizontal }">
    <img class="logo" :src="logoUrl" />
    <div class="texts">
      <div class="bold">{{ tournamentName }}</div>
      <div :class="{ bold: text1Bold }">{{ text1 }}</div>
      <div :class="{ bold: text2Bold }">{{ text2 }}</div>
    </div>
  </div>
</template>

<style scoped>
.master-logo-header {
  font-size: 24px;
  white-space: nowrap;
}

.logo {
  max-width: 180px;
  width: auto;
  height: auto;
}

.texts {
  margin-left: v-bind("horizontal ? '40px' : 'unset'");
}
</style>
