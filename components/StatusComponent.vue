<template>
  <div>
    <div v-if="!pokemon.status">Select a pokemon</div>
    <div v-else>
      <span>Strength:</span>
      <div class="progress mb-2">
        <div
          class="progress-bar"
          role="progressbar"
          :style="`width: ${pokemon.status.strength}%`"
          :aria-valuenow="pokemon.status.strength"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {{ pokemon.status.strength }}
        </div>
      </div>

      <span>Agility:</span>
      <div class="progress mb-2">
        <div
          class="progress-bar"
          role="progressbar"
          :style="`width: ${pokemon.status.agility}%`"
          :aria-valuenow="pokemon.status.agility"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {{ pokemon.status.agility }}
        </div>
      </div>

      <span>Attack:</span>
      <div class="progress mb-2">
        <div
          class="progress-bar"
          role="progressbar"
          :style="`width: ${pokemon.status.attack}%`"
          :aria-valuenow="pokemon.status.attack"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {{ pokemon.status.attack }}
        </div>
      </div>

      <span>Defense:</span>
      <div class="progress mb-2">
        <div
          class="progress-bar"
          role="progressbar"
          :style="`width: ${pokemon.status.defense}%`"
          :aria-valuenow="pokemon.status.defense"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {{ pokemon.status.defense }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatusComponent",
  props: {
    pokemon: Object,
  },
};
</script>
