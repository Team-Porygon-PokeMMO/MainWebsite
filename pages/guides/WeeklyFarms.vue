<script lang="ts">
import weeklyReruns from '~/src/Weeklys/weeklyRuns.json';
import eliteFourTips from '~/src/EliteFour/tips.json';
import type { Battle } from '~/components/Weeklys.vue'; // Import the correct type for Battle

export class Tip {
  Description: string = "";
  Classes: string[] = [];
  Tips: Tip[] = [];
  IsVisible: boolean = false;
  Url: string = "";
  Name: string = "";
}

export class Step {
  Description: string = "";
  Classes: string[] = [];
  Steps: Step[] = [];
  IsVisible: boolean = false;
}

export default {
  data() {
    return {
      Battles: weeklyReruns as Battle[], // Ensure that hooh is typed as Battle[]
      tips: eliteFourTips as Tip[],
      tipsVisible: false,
    };
  },
  methods: {
    toggleView(option: any) {
      option.IsVisible = !option.IsVisible;
    },
    toggleTips() {
      this.tipsVisible = !this.tipsVisible;
    },
  },
};
</script>

<template>
  <div class="m-4 main">
    <div class="p-2">
      <h2 class="text-center">Weekly Leads</h2>
    </div>
    <div class="menu p-4">
      <p class="menu-label cursor-pointer text-lg" @click="toggleTips()">
        {{ tipsVisible ? '▼' : '▶' }} Tips
      </p>
      <ul class="menu-list text-label" v-show="tipsVisible">
        <Tips :items="tips" />
      </ul>
      <!-- Pass Battle data to the Weeklys component -->
      <Weeklys :items="Battles" class="menu-list" />
    </div>
    <EliteFourCredits />
  </div>
</template>
