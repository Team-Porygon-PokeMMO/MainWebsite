<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export class Battle {
  Name: string = "";
  IsVisible: boolean = false;
  Leads: Lead[] = [];  // Fix: "Leads" should be plural here
  Image?: string;
  ImagePosition?: string;
}

export class Lead {
  Name: string = "";
  IsVisible: boolean = false;
  Steps: Step[] = [];
}

export class Step {
  Description: string = "";
  Classes: string[] = [];
  Steps: Step[] = [];
  IsVisible: boolean = false;
}

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<Battle[]>,  // Ensuring Battle[] is recognized as the correct type
      required: true,
    },
  },
  methods: {
    setActive(item: Battle) {
      this.items.forEach((i) => {
        i.IsVisible = i === item ? !i.IsVisible : false; // Toggle visibility of clicked Battle
      });
    },
    getImageStyling(item: Battle) {
      if (item.Image) {
        return {
          backgroundImage: `linear-gradient(rgb(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)), url(${item.Image})`,
          backgroundSize: 'cover',
          backgroundPosition: item?.ImagePosition ?? '25% 15%',
          width: '100%',
          height: '100%',
        };
      }
    },
  },
});
</script>

<template>
  <div class="text-center">
    <!-- Lead Selector: List of Regions -->
    <div class="grid grid-cols-5 lg:py-0.5 cursor-pointer">
      <div
        v-for="item in items"
        @click="setActive(item)"
        :class="{ active: item.IsVisible }"
        class="py-1 sm:text-sm sm:py-2 border border-black m-0.25 md:text-base md:py-3 lg:py-5 hover:bg-cyan-700"
        :style="getImageStyling(item)"
      >
        <span class="bg-black bg-opacity-50 text-white p-0.5">{{ item.Name }}</span>
      </div>
    </div>

    <!-- Trainers within the selected Region -->
    <div v-for="item in items" :key="item.Name">
      <div v-for="lead in item.Leads" :key="lead.Name" v-show="item.IsVisible">
        <p>{{ lead.Name }}</p>
        <div v-for="step in lead.Steps" :key="step.Description">
          <p>{{ step.Description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
