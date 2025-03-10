<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export class Battle {
  Name: string = "";
  IsVisible: boolean = false;
  Leads: Lead[] = [];
  Image?: string;
}

export class Lead {
  Name: string = "";
  Image: string = "";
  IsVisible: boolean = false;
  Missions: Mission[] = [];
}

export class Mission {
  Name: string = "";
  Image: string = "";
  Steps: Step[] = [];
}

export class Step {
  Description: string = "";
}

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<Battle[]>,
      required: true,
    },
  },
  data() {
    return {
      selectedBattle: null as Battle | null,
      selectedLead: null as Lead | null,
      selectedMission: null as Mission | null,
    };
  },
  methods: {
    setActive(item: Battle) {
      this.items.forEach((i) => i.IsVisible = i === item ? !i.IsVisible : false);
      this.selectedBattle = item.IsVisible ? item : null;
      this.selectedLead = null;
      this.selectedMission = null;
    },
    showLeads(lead: Lead) {
      this.selectedLead = lead;
      this.selectedMission = null;
    },
    selectMission(mission: Mission) {
      this.selectedMission = mission;
    },
    getImageStyling(item: Battle | Lead | Mission) {
      return {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)), url(${item.Image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
      };
    },
  },
});
</script>

<template>
  <div class="text-center">
    <!-- Step 1: Select Battle -->
    <div class="grid grid-cols-5 lg:py-0.5 cursor-pointer">
      <div
        v-for="item in items"
        :key="item.Name"
        @click="setActive(item)"
        class="py-3 border border-black m-1 text-white font-bold hover:bg-cyan-700"
        :style="getImageStyling(item)"
      >
        <span class="bg-black bg-opacity-50 p-1">{{ item.Name }}</span>
      </div>
    </div>

    <!-- Step 2: Show Leads with Same Styling -->
    <div v-if="selectedBattle" class="grid grid-cols-5 gap-2 mt-4">
      <div
        v-for="lead in selectedBattle.Leads"
        :key="lead.Name"
        class="py-3 border border-black text-white font-bold cursor-pointer hover:bg-cyan-700"
        @click="showLeads(lead)"
        :style="getImageStyling(lead)"
      >
        <span class="bg-black bg-opacity-50 p-1">{{ lead.Name }}</span>
      </div>
    </div>

    <!-- Step 3: Show Missions with Same Styling -->
    <div v-if="selectedLead" class="grid grid-cols-5 gap-2 mt-4">
      <div
        v-for="mission in selectedLead.Missions"
        :key="mission.Name"
        class="py-3 border border-black text-white font-bold cursor-pointer hover:bg-cyan-700"
        @click="selectMission(mission)"
        :style="getImageStyling(mission)"
      >
        <span class="bg-black bg-opacity-50 p-1">{{ mission.Name }}</span>
      </div>
    </div>

    <!-- Step 4: Show Steps -->
    <div v-if="selectedMission" class="mt-4">
      <h3 class="text-lg font-bold">{{ selectedMission.Name }} Steps:</h3>
      <div v-for="step in selectedMission.Steps" :key="step.Description" class="py-2">
        <p>{{ step.Description }}</p>
      </div>
    </div>
  </div>
</template>
