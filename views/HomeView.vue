<template>
  <div class="container">
    <div class="row mt-2">
      <!-- start left side -->
      <div class="col mb-2">
        <div class="card stage">
          <div class="card-header"></div>

          <div class="card-body bg-pokeball bg-normal">
            <div class="pokemon">
              <!-- 
                name="jump" //indicates the set of classes
                type="animation" //predominant progression time
                :duration="{ enter: 2000, leave: 1000 }" //manual progression time
                @before-enter="beforeEnter"
                @enter="enter"
                @after-enter="afterEnter"
                @enter-cancelled="enterCancelled"
                @before-leave="beforeLeave"
                @leave="leave"
                @after-leave="afterLeave"
                @leave-cancelled="leaveCancelled"
              -->
              <transition
                @after-enter="transitionToShowEvolutions"
                @before-leave="transitionToHideEvolutions"
                enter-active-class="animate__animated animate__bounceIn"
                leave-active-class="animate__animated animate__bounceOut"
              >
                <img
                  :src="require(`@/assets/images/pokemons/${pokemon.image}`)"
                  v-if="show"
                />
              </transition>

              <div class="evolutions">
                <transition
                  name="fade"
                  v-for="e in pokemon.evolutions"
                  :key="e"
                >
                  <img
                    :src="
                      require(`@/assets/images/pokemons/${e
                        .toString()
                        .padStart(3, '0')}.png`)
                    "
                    v-if="showEvolutions"
                  />
                </transition>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <nav class="nav nav-pills nav-fill">
              <!-- navigation menu -->
              <router-link
                class="nav-item nav-link text-white"
                :to="{ path: '/about' }"
                exact-active-class="active"
                >About</router-link
              >
              <router-link
                class="nav-item nav-link text-white"
                :to="{ path: '/status' }"
                exact-active-class="active"
                >Status</router-link
              >
              <router-link
                class="nav-item nav-link text-white"
                :to="{ path: '/ability' }"
                exact-active-class="active"
                >Ability</router-link
              >
            </nav>

            <div class="details">
              <!-- displays data according to navigation menu -->
              <router-view
                v-slot="{ Component }"
                :pokemon="pokemon"
                @addAbility="addAbility"
                @removeAbility="removeAbility"
              >
                <transition
                  enter-active-class="animate__animated animate__zoomInDown"
                >
                  <component :is="Component"></component>
                </transition>
              </router-view>
            </div>
          </div>
        </div>
      </div>
      <!-- end left side -->

      <!-- start right side -->
      <div class="col mb-2 pokedex">
        <div class="row">
          <div class="col">
            <h1>Pokedex</h1>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <select class="form-select" v-model="sort">
              <option value="" selected disabled>Order pokemon</option>
              <option value="1">increasing id</option>
              <option value="2">decreasing id</option>
              <option value="3">A-Z</option>
              <option value="4">Z-A</option>
              <option value="5">Z-A (localeCompare)</option>
            </select>
          </div>

          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="search pokemon"
              v-model="pokemonName"
            />
          </div>
        </div>

        <div class="row">
          <div class="pokedex-catalog">
            <!-- start of dynamic list -->
            <transition-group name="assortment">
              <div
                v-for="p in pokemons"
                :key="p.id"
                :class="`card-pokemon bg-${p.type}`"
                @click="detectPokemon(p)"
              >
                <h1>{{ p.id }} {{ p.name }}</h1>
                <span>{{ p.type }}</span>
                <div class="card-pokemon-img">
                  <transition
                    appear
                    enter-active-class="animate__animated animate__fadeInDown"
                  >
                    <img
                      :src="require(`@/assets/images/pokemons/${p.image}`)"
                    />
                  </transition>
                </div>
              </div>
            </transition-group>
            <!-- end of dynamic list -->
          </div>
        </div>
      </div>
      <!-- end right side -->
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data: () => ({
    show: false,
    showEvolutions: false,
    pokemon: {},
    pokemons: [],
    sort: "",
    pokemonName: "",
  }),
  watch: {
    pokemonName(newValue) {
      fetch(`http://localhost:3000/pokemons?name_like=${newValue}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.pokemons = data;
        });
    },
    sort(newValue) {
      if (newValue == 1) {
        this.assortment("id", "ASC");
      }

      if (newValue == 2) {
        this.assortment("id", "DESC");
      }

      if (newValue == 3) {
        this.assortment("name", "ASC");
      }

      if (newValue == 4) {
        this.assortment("name", "DESC");
      }

      if (newValue == 5) {
        this.pokemons.sort((next, current) => {
          return current.name.localeCompare(next.name);
        });
      }
    },
  },
  methods: {
    assortment(attribute, order) {
      //sort method
      //return 1 to indicate that the order is correct
      //return -1 to indicate that the order is not correct
      //return 0 to indicate that they are equal (nothing must be done)
      if (order == "ASC") {
        this.pokemons.sort((next, current) => {
          if (current[attribute] < next[attribute]) {
            return 1;
          } else if (current[attribute] > next[attribute]) {
            return -1;
          }

          return 0;
        });
      } else if (order == "DESC") {
        this.pokemons.sort((next, current) => {
          if (current[attribute] < next[attribute]) {
            return -1;
          } else if (current[attribute] > next[attribute]) {
            return 1;
          }

          return 0;
        });
      }
    },
    detectPokemon(p) {
      let changeDetectedPokemon = false;
      if (this.pokemon.id != p.id && this.show) {
        setTimeout(() => {
          this.detectPokemon(p);
        }, 1000);

        changeDetectedPokemon = true;
      }
      this.pokemon = p;
      this.show = !this.show;
      this.showEvolutions = !this.showEvolutions;

      if (!this.show && !changeDetectedPokemon) {
        this.pokemon = {};
      }
    },
    transitionToShowEvolutions() {
      this.showEvolutions = true;
    },
    transitionToHideEvolutions() {
      this.showEvolutions = false;
    },
    addAbility(ability) {
      if (this.pokemon.abilities && ability) {
        this.pokemon.abilities.push(ability);
      }
    },
    removeAbility(index) {
      if (this.pokemon.abilities[index]) {
        this.pokemon.abilities.splice(index, 1);
      }
    },
  },
  created() {
    fetch("http://localhost:3000/pokemons")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.pokemons = data;
      });
  },
};
</script>

<style>
body {
  background-color: #dee3eb;
}
</style>

<style scoped>
@import "~@/assets/css/animations.css";

.pokedex {
  padding: 20px;
  background-color: #ffffff;
  -webkit-box-shadow: 2px 2px 10px rgba(200, 200, 200, 0.77);
  -moz-box-shadow: 2px 2px 10px rgba(200, 200, 200, 0.77);
  box-shadow: 2px 2px 10px rgba(200, 200, 200, 0.77);
  border-radius: 10px;
}

.pokedex-catalog {
  overflow: auto;
  display: flex;
  flex-wrap: wrap;
  height: 400px;
  width: 98%;
  margin-top: 10px;
}

.card-pokemon {
  position: relative;
  margin: 5px;
  width: 150px;
  height: 115px;
  cursor: pointer;
  border-radius: 5px;
  -webkit-box-shadow: 2px 2px 2px rgba(200, 200, 200, 0.77);
  -moz-box-shadow: 2px 2px 2px rgba(200, 200, 200, 0.77);
  box-shadow: 2px 2px 2px rgba(200, 200, 200, 0.77);
}

.card-pokemon h1 {
  color: #fff;
  font-size: 14px;
  margin: 5px 0px 0px 5px;
  padding: 0px;
}

.card-pokemon span {
  color: #fff;
  position: absolute;
  background: rgba(255, 255, 255, 0.3);
  font-size: 12px;
  margin: 10px 0px 0px 5px;
  padding: 5px 10px 5px 10px;
  border-radius: 25px;
}

.card-pokemon img {
  max-width: 60%;
  max-height: 60%;
  float: right;
}

.bg-gram {
  background-color: #2d8f78;
}

.bg-fire {
  background-color: #e47373;
}

.bg-water {
  background-color: #5a9ed2;
}

.bg-insect {
  background-color: #26d3ab;
}

.bg-normal {
  background-color: #cecece;
}

.bg-pokeball {
  background-image: url("~@/assets/images/pokeball.png");
  background-repeat: no-repeat;
  background-position: bottom right;
}

.stage {
  color: #fff;
  background-color: #333;
  -webkit-box-shadow: 2px 2px 10px rgba(230, 223, 223, 0.77);
  -moz-box-shadow: 2px 2px 10px rgba(230, 223, 223, 0.77);
  box-shadow: 2px 2px 10px rgba(230, 223, 223, 0.77);
  border-radius: 10px;
}

.pokemon {
  display: block;
  text-align: center;
  height: 215px;
}

.details {
  margin: 20px 30px 20px 30px;
}

.evolutions {
  position: absolute;
  top: 0;
  right: 0;
  height: 70px;
}

.evolutions img {
  cursor: pointer;
  max-width: 100%;
  max-height: 100%;
  float: left;
}
</style>
