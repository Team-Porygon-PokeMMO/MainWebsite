<template>
  <div>
    <div v-if="!pokemon.abilities">Select a pokemon</div>
    <div v-else>
      <table class="table text-white">
        <tbody>
          <transition-group name="slide">
            <!-- :key="ability" exclusive for the transition-group -->
            <tr v-for="(ability, index) in orderedAbilities" :key="ability">
              <td>{{ ability }}</td>
              <td class="d-flex justify-content-end">
                <button
                  type="button"
                  class="btn btn-danger btn-sm"
                  @click="removeAbility(index)"
                >
                  x
                </button>
              </td>
            </tr>
          </transition-group>
        </tbody>
      </table>
      <input
        type="text"
        class="form-control"
        placeholder="Add ability"
        v-model="ability"
        @keyup.enter="addAbility"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "AbilityComponent",
  props: {
    pokemon: Object,
  },
  data: () => ({
    ability: "",
  }),
  methods: {
    addAbility() {
      this.$emit("addAbility", this.ability);
      this.ability = "";
    },
    removeAbility(index) {
      this.$emit("removeAbility", index);
    },
  },
  computed: {
    orderedAbilities() {
      let abilities = this.pokemon.abilities;
      return abilities.sort();
    },
  },
};
</script>

<style scoped>
@import "~@/assets/css/animations.css";
.table td {
  border: none;
  color: white;
  background: transparent;
}
</style>
