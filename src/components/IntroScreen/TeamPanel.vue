<script setup>
import RoundBox from "@/components/RoundBox.vue";
import PlayerBox from "@/components/IntroScreen/TeamPanel/PlayerBox.vue";
import TeamInfo from "@/components/IntroScreen/TeamPanel/TeamInfo.vue";
</script>

<template>
  <div class="master-team-panel">
    <round-box color="red" value="MZ" class="acronym"></round-box>
    <div class="teamName">Team 쩌리들</div>
    <div class="masterBox">
      <player-box></player-box>
      <player-box></player-box>
      <team-info></team-info>
    </div>
  </div>
</template>

<style scoped>
.master-team-panel {
  margin-right: 200px;
}

.acronym {
  width: 100px;
  height: 50px;
}

.teamName {
  font-size: 40px;
  height: 80px;
  line-height: 80px;
}

.masterBox {
  width: 380px;
  height: 360px;
  background-color: var(--color-white-translucent);
  padding: 10px 10px 10px 20px;
}
</style>
