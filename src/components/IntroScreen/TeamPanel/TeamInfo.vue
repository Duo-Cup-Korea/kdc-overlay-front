<script setup></script>

<template>
  <div class="master-team-info">
    <div class="section">
      <div class="label">avg. rank</div>
      <div class="value">#2,352</div>
    </div>
    <div class="line"></div>
    <div class="section">
      <div class="label">quals. seeding</div>
      <div class="value">#3</div>
    </div>
  </div>
</template>

<style scoped>
.master-team-info {
  width: 360px;
  height: 60px;
  padding: 10px;
  background-color: var(--color-black-translucent);
  display: flex;
  flex-direction: row;
}

.section {
  width: 50%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.line {
  width: 2px;
  height: 100%;
}

.label {
  font-size: 16px;
}

.value {
  font-size: 24px;
}
</style>
