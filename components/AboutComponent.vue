<template>
  <div>
    <div v-if="!pokemon.id">Select a pokemon</div>
    <div v-else>
      <p>Identifier: {{ pokemon.id }}</p>
      <p>Name: {{ pokemon.name }}</p>
      <p>Type: {{ pokemon.type }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutComponent",
  props: {
    pokemon: Object,
  },
};
</script>
