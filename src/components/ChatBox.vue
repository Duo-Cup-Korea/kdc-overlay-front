<script setup>
import { ref } from "vue";

/* ==========================================
 *          Placeholder Constants
 * ========================================== */
const rows = ref(new Array(6));
/* ========================================== */
</script>

<template>
  <div class="master-chat-box">
    <!--Iteration-->
    <div v-for="item in rows" :key="row">
      <div class="horizontal-box chat">
        <div class="timestamp roboto">16:37:52</div>
        <div class="nick" :style="{ color: `var(--color-yellow)` }">yhsphd</div>
        <div class="cell message">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. 한국어 테스트
        </div>
        <!--<div class="message">Duis aute irure dolor in reprehenderit</div>-->
      </div>
    </div>
    <!---->
  </div>
</template>

<style scoped>
.master-chat-box {
  font-size: 20px;
  overflow: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.master-chat-box::-webkit-scrollbar {
  display: none;
}

.chat {
  margin-top: 8px;
}

.chat > * {
  line-height: 24px;
  margin: 0 4px 0 4px;
}

.timestamp {
  font-size: 16px;
}

.nick {
  font-weight: bold;
}

.message {
  width: 0;
  flex-grow: 1;
}
</style>
