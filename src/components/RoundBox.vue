<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  value: String,
  color: String,
});

const masterRef = ref(null);

const bgcol = computed(() => {
  if (props.color === "red") {
    return "var(--color-red-translucent)";
  } else if (props.color === "blue") {
    return "var(--color-blue-translucent)";
  } else if (props.color === "grey") {
    return "var(--color-grey-translucent)";
  } else {
    return props.color;
  }
});

const txtsize = computed(() => {
  if (masterRef.value) {
    return masterRef.value.getBoundingClientRect().height * 0.64 + "px";
  } else {
    return "0px";
  }
});
</script>

<template>
  <div class="master-round-box" ref="masterRef" :style="{ backgroundColor: bgcol }">
    <span class="value" :style="{ fontSize: txtsize }">{{ value }}</span>
    <!--TODO: replace with <slot>-->
  </div>
</template>

<style scoped>
.master-round-box {
  border-radius: 999999px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
</style>
