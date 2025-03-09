<script lang="ts">
import hooh from '~/src/Weeklys/hooh.json';

export class Step {
  Description: string = "";
  IsVisible: boolean = false;
  Steps: Step[] = [];  // Recursive structure, Steps can contain more Steps
}

export class Region {
  Name: string = "";
  IsVisible: boolean = false;
  Image?: string;
  ImagePosition?: string;
  Steps: Step[] = [];  // An array of Step objects
}

export default {
  data() {
    return {
      regions: Array.isArray(hooh) ? hooh : [],  // Ensure hooh is treated as an array of regions
      tipsVisible: false
    };
  },
  methods: {
    // Toggle visibility of the region (Ho-Oh)
    toggleView(option: Region) {
      option.IsVisible = !option.IsVisible;
    },
    // Toggle visibility of individual steps for Ho-Oh
    toggleStep(step: Step) {
      step.IsVisible = !step.IsVisible;
    },
    // Method to get image styling for the background of the region (Ho-Oh)
    getImageStyling(item: Region) {
      if (item.Image) {
        return {
          backgroundImage: `linear-gradient(rgb(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)), url(${item.Image})`,
          backgroundSize: 'cover',
          backgroundPosition: item?.ImagePosition ?? '25% 15%',
          width: '100%',
          height: '100%',
        };
      }
      return {};
    }
  },
};
</script>

<template>
  <div class="m-4 main">
    <div class="p-2">
      <h2 class="text-center">Ho-Oh Weekly Rerun</h2>
      <h3 class="text-center">Follow the steps to catch Ho-Oh!</h3>
    </div>

    <!-- Ho-Oh Region -->
    <div class="menu p-4">
      <div class="grid grid-cols-5 lg:py-0.5 cursor-pointer">
        <div v-for="region in regions" :key="region.Name" @click="toggleView(region)" :class="{ active: region.IsVisible }"
          class="py-1 sm:text-sm sm:py-2 border border-black m-0.25 md:text-base md:py-3 lg:py-5 hover:bg-cyan-700"
          :style="getImageStyling(region)">
          <span class="bg-black bg-opacity-50 text-white p-0.5">{{ region.Name }}</span>
        </div>
      </div>

      <!-- Steps Section for Ho-Oh (Visible when region is selected) -->
      <div v-if="regions.some(region => region.IsVisible)" class="steps-container">
        <div v-for="region in regions" v-if="region.IsVisible" :key="region.Name">
          <h3>{{ region.Name }} Steps</h3>
          <div v-for="(step, index) in region.Steps" :key="index" class="step-item">
            <h4 @click="toggleStep(step)" :class="{ active: step.IsVisible }">
              Step {{ index + 1 }}: {{ step.Description }}
            </h4>
            <div v-if="step.IsVisible" class="step-detail">
              <!-- Render more detailed information if the step is visible -->
              <p>More details for this step...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  min-height: 100%;
}

.active {
  background-color: rgba(51, 3, 3, 0.95);
}

.steps-container {
  margin-top: 20px;
  padding: 10px;
}

.step-item {
  margin-left: 20px;
}

ul {
  padding-left: 20px;
}
</style>
