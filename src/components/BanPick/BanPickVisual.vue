<script setup>
import TeamBox from "@/components/BanPick/BanPickVisual/TeamBox.vue";
import DecisionBox from "@/components/BanPick/BanPickVisual/DecisionBox.vue";
import { computed, ref } from "vue";

const cellData = computed(() => {
  let insertOrder;
  let disableOrder;
  let hideOrder = [6, 9];
  let data = new Array(12);

  /*
   * data array structure
   *
   * [visibility, pick/ban, team, code, mapSetId]
   * visibility: Number / -2 hidden / -1 disable / 0 undecided / 1 waiting / 2 fixed
   * pick/ban: string / "ban" / "pick"
   * team: string / "red" / "blue"
   * code: string / "NM1"
   * mapSetId: Number
   */

  /*
   * Cell Order
   *
   * 0 2 | 5 7 9 11
   *  1 3|4 6 8 10
   * */

  if (bo.value === 9 || (bo.value === 11 && phase.value === 1)) {
    insertOrder = [0, 1, 4, 5, 7, 8];
    disableOrder = [2, 3, 10, 11];
  } else if ((bo.value === 11 && phase.value === 2) || (bo.value === 13 && phase.value === 2)) {
    insertOrder = [0, 1, 4, 5, 7, 8, 10, 11];
    disableOrder = [2, 3];
  } else if (bo.value === 13 && phase.value === 1) {
    insertOrder = [0, 1, 2, 3, 4, 5, 7, 8, 10, 11];
    disableOrder = [];
  }

  for (let i = 0; i < insertOrder.length; i++) {
    if (i < banPickData.value.length) {
      data[insertOrder[i]] = {
        visibility: 2,
        pickBan: banPickData.value[i][0],
        team: banPickData.value[i][1],
        code: banPickData.value[i][2],
        mapSetId: banPickData.value[i][3],
      };
    } else if (i === banPickData.value.length) {
      data[insertOrder[i]] = { visibility: 1 };
    } else {
      data[insertOrder[i]] = { visibility: 0 };
    }
  }

  for (let i = 0; i < disableOrder.length; i++) {
    data[disableOrder[i]] = { visibility: -1 };
  }

  for (let i = 0; i < hideOrder.length; i++) {
    data[hideOrder[i]] = { visibility: -2 };
  }

  return data;
});

/* ==========================================
 *          Placeholder Constants
 * ========================================== */
const bo = ref(11);
const phase = ref(2);
const firstPick = ref("red");
const banPickData = ref([
  ["ban", "blue", "NM1", 1012634],
  ["ban", "red", "NM1", 1012634],
  ["pick", "red", "NM1", 1012634],
  ["pick", "blue", "NM1", 1012634],
  ["pick", "blue", "NM1", 1012634],
  ["pick", "red", "NM1", 1012634],
]);
/* ========================================== */
</script>

<template>
  <div class="master-ban-pick-visual horizontal-box">
    <!--TeamBox Area-->
    <div>
      <div class="teamBox red">
        <div class="content">
          <team-box></team-box>
        </div>
      </div>
      <div class="teamBox blue">
        <div class="content">
          <team-box></team-box>
        </div>
      </div>
    </div>
    <!--BanBox Area-->
    <div class="mapBox banBox">
      <div class="horizontal-box mapsRow">
        <div class="decisionBoxOffset" :style="{ flexGrow: firstPick === 'blue' ? 0 : 1 }">
          <div>Ban</div>
        </div>
        <decision-box
          v-for="i in firstPick === 'blue' ? [0, 2] : [1, 3]"
          :index="i"
          v-bind="cellData[i]"
          :key="i"
        ></decision-box>
      </div>
      <div class="horizontal-box mapsRow">
        <div class="decisionBoxOffset" :style="{ flexGrow: firstPick === 'blue' ? 1 : 0 }">
          <div>BAN</div>
        </div>
        <decision-box
          v-for="i in firstPick === 'blue' ? [1, 3] : [0, 2]"
          :index="i"
          v-bind="cellData[i]"
          :key="i"
        ></decision-box>
      </div>
      <div class="boxDivider absolute-center"></div>
    </div>
    <!--PickBox Area-->
    <div class="mapBox pickBox">
      <div class="horizontal-box mapsRow">
        <div class="decisionBoxOffset" :style="{ flexGrow: firstPick === 'blue' ? 1 : 0 }">
          <div>Pick</div>
        </div>
        <decision-box
          v-for="i in firstPick === 'blue' ? [5, 7, 9, 11] : [4, 6, 8, 10]"
          :index="i"
          v-bind="cellData[i]"
          :key="i"
        ></decision-box>
      </div>
      <div class="horizontal-box mapsRow">
        <div class="decisionBoxOffset" :style="{ flexGrow: firstPick === 'blue' ? 0 : 1 }">
          <div>Pick</div>
        </div>
        <decision-box
          v-for="i in firstPick === 'blue' ? [4, 6, 8, 10] : [5, 7, 9, 11]"
          :index="i"
          v-bind="cellData[i]"
          :key="i"
        ></decision-box>
      </div>
      <div class="boxDivider absolute-center"></div>
    </div>
  </div>
</template>

<style scoped>
.teamBox {
  width: 390px;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.teamBox.red {
  background-color: var(--color-red-translucent);
}

.teamBox.blue {
  margin-top: 10px;
  background-color: var(--color-blue-translucent);
}

.teamBox > .content {
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  background-color: var(--color-black-translucent);
}

.mapBox {
  position: relative;
  height: calc(100% - 30px);
  background-color: var(--color-white-translucent);
  margin-left: 10px;
  padding: 15px 10px 15px 10px;
}

.mapBox.banBox {
  width: 515px;
}

.mapBox.pickBox {
  width: 935px;
}

.boxDivider {
  width: calc(100% - 20px);
  height: 2px;
  background-color: black;
}

.mapsRow {
  width: 100%;
  margin-bottom: 40px;
}

.decisionBoxOffset {
  width: 0;
  overflow: hidden;
  transition: flex-grow 1s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  text-align: center;
  font-style: italic;
  font-weight: bold;
  opacity: 0.3;
}
</style>
