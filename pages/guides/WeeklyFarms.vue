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
export class Trainer {
    Name: string = "";
    IsVisible: boolean = false;
    Leads: Leads[] = [];
    Image?: string;
    ImagePosition?: string;
}
export class Leads {
    Name: string = "";
    IsVisible: boolean = false;
    Steps: Step[] = [];
}
export class Region {
    Name: string = "";
    IsVisible: boolean = false;
    GymTrainers: Trainer[] = [];
}

export default {
  data() {
    return {
      //regions: [kantoEliteFour, johtopEliteFour, hoennEliteFour, sinnohEliteFour, unovaEliteFour] as Region[],
      regions: weeklyReruns as Region[], // Ensure that hooh is typed as Battle[]
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

<style>
.main {
    min-height: 100%;
}

.active {
    background-color: rgba(51, 3, 3, 0.95);
}

/* Responsive styles */
@media (max-width: 768px) {
    .menu {
        padding: 10px;
    }

    .menu-list a {
        padding: 8px;
    }
}
</style>

<template>
  <div class="m-4 main">
    <div class="p-2">
      <h2 class="text-center">Weekly Leads</h2>
    </div>
    <div class="menu p-4">
            <p class="menu-label cursor-pointer text-lg" @click="toggleTips()">
                {{ tipsVisible ?
                    "▼" : "▶" }} Tips
            </p>
            <ul class="menu-list text-label" v-show="tipsVisible">
                <Tips :items="tips" />
            </ul>
            <Regions :items="regions" class="menu-list" />
        </div>
    <EliteFourCredits />
  </div>
</template>
