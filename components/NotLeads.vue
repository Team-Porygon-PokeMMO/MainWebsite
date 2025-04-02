<script lang="ts">
import type { PropType } from 'vue';
import nameToDex from '~/src/nameToDex.json';  // Not used in the current code but might be helpful later.
import leadsData from '~/src/Weeklys/weeklyRuns.json';  // Your JSON data for weekly runs.

interface Step {
  Description: string;
  Icons?: string;
  Steps: Step[];  // Steps inside each step
  IsVisible: boolean;
}

interface Lead {
  Name: string;
  IsVisible: boolean;
  Steps: Step[];
}

interface GymTrainer {
  Name: string;
  IsVisible: boolean;
  Image: string;
  ImagePosition: string;
  Leads: Lead[];
}

interface Gen {
  Name: string;
  IsVisible: boolean;
  Image: string;
  ImagePosition: string;
  GymTrainers: GymTrainer[];
}

export default {
  props: {
    items: {
    type: Array as PropType<Lead[]>, // Change from Gen[] to Lead[]
    required: true,
    },
  },
  data() {
    return {
      selectedGen: null as Gen | null,  // Track selected Gen
      selectedPokemon: null as Lead | null,  // Track selected Pokémon (Lead)
      weeklyData: this.items,  // Load passed items (JSON data)
    };
  },
  computed: {
    filteredPokemon(): Lead[] {
      // Since 'items' is Lead[], we no longer need to refer to 'selectedGen'.
      return this.items;
    },
    selectedSteps(): Step[] {
      return this.selectedPokemon ? this.selectedPokemon.Steps : [];  // Return steps for the selected Pokémon.
    },
  },
  methods: {
    setGenActive(item: Lead) {
      // If you're dealing with 'Lead' instead of 'Gen', this should be updated accordingly.
      this.selectedGen = null;  // Reset Gen as we are selecting a Lead now.
      this.selectedPokemon = item;  // Set selected Pokémon (Lead)
    },
    setPokemonStartActive(pokemon: Lead) {
      this.selectedPokemon = pokemon;  // Set the selected Pokémon (Lead)
    },
    getImageStyling(item: GymTrainer) {
      return {
        backgroundImage: `linear-gradient(rgb(0, 0, 0, 0.4), rgba(0, 0, 0, 0)), url(${item.Image})`,
        backgroundSize: 'cover',
        backgroundPosition: item.ImagePosition || 'center',
      };
    },
  },
};
</script>

<template>
    <div class="text-center">
      <UDivider class="my-2" />
    
      <!-- Gen Selection -->
      <div class="grid grid-cols-5">
        <div
          v-for="trainer in weeklyData"
          :key="trainer.Name"
          @click="setGenActive(trainer)"
          :class="{ active: selectedGen?.Name === trainer.Name }"
          class="border border-black p-2 cursor-pointer"
        >
          {{ trainer.Name }}
        </div>
      </div>
    
      <!-- Pokémon Selection (Visible when a Gen is selected) -->
      <div v-if="selectedGen" class="grid grid-cols-5 mt-4">
        <div
          v-for="pokemon in filteredPokemon"
          :key="pokemon.Name"
          @click="setPokemonStartActive(pokemon)"
          :class="{ active: selectedPokemon?.Name === pokemon.Name }"
          class="border border-black p-2 cursor-pointer"
        >
          {{ pokemon.Name }}
        </div>
      </div>
    
      <!-- Steps (Visible when a Pokémon is selected) -->
      <div v-if="selectedPokemon" class="mt-4">
        <h3>Steps for {{ selectedPokemon.Name }}</h3>
        <div v-for="step in selectedSteps" :key="step.Description">
          <h4>{{ step.Description }}</h4>
          <ul>
            <li v-for="subStep in step.Steps" :key="subStep.Description">
              {{ subStep.Description }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>