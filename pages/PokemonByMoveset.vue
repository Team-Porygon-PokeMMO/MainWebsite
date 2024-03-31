<script lang="ts">
import { ref, computed } from "vue";

const headers = {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
}
async function getAllMoves(): Promise<any> {
    const response = await fetch('http://137.184.247.174:8000/api/pokemmo/moves', { headers });
    const data = await response.json();
    return data.sort((a: any, b: any) => a.name.localeCompare(b.name));
}

async function getAllAbilities(): Promise<any> {
    const response = await fetch('http://137.184.247.174:8000/api/pokemmo/abilities');
    const data = await response.json();
    return data.sort((a: any, b: any) => a.name.localeCompare(b.name));
}

async function getPokemonsByMoveset(): Promise<any> {
    const moveSets = []
    if (selectedMoveOne.value) {
        moveSets.push(selectedMoveOne.value);
    }
    if (selectedMoveTwo.value) {
        moveSets.push(selectedMoveTwo.value);
    }
    if (selectedMoveThree.value) {
        moveSets.push(selectedMoveThree.value);
    }
    if (selectedMoveFour.value) {
        moveSets.push(selectedMoveFour.value);
    }
    // const response = await fetch('http://137.184.247.174:8000/api/pokemmo/pokemon/filter-by-moveset', { headers,method: 'POST', body: JSON.stringify(moveSets)});
    // const data = await response.json();
    const data = {
        id: 1,
        name: 'Bulbasaur',
    }
    return data;
}

let selectedMoveOne = ref('');
let selectedMoveTwo = ref('');
let selectedMoveThree = ref('');
let selectedMoveFour = ref('');
let pokemonByMoveset = ref([])

const moves = getAllMoves();
const abilities = getAllAbilities();

async function updatePokemonByMoveset() {
    pokemonByMoveset = await getPokemonsByMoveset();
}

type Pokemon = {
    id: number;
    name: string;
}

export default {
    data() {
        return {
            moves: [] as any,
            abilities: [] as any,
        };
    },
    methods: {
        alreadySelected(moveId: string) {
            return this.selectedMoveOne === moveId || this.selectedMoveTwo === moveId || this.selectedMoveThree === moveId || this.selectedMoveFour === moveId;
        },
    },
    setup() {
        return {
            selectedMoveOne,
            selectedMoveTwo,
            selectedMoveThree,
            selectedMoveFour,
            pokemonByMoveset,
            updatePokemonByMoveset,
        };
    },
    async mounted() {
        this.moves = await moves;
        this.abilities = await abilities;
    },
};
</script>

<template>
    <div class="container mx-auto">
        Call pokemon by moves {{ selectedMoveOne }}
        <h1>Pokemon By Moveset</h1>
        <div>
            <div>
                <label for="pokemon">Move 1</label>
            </div>
            <select class="form-control" :required="true" v-model="selectedMoveOne">
                <option v-for="move in moves" :value="move.id" :key="move.id" :disabled="alreadySelected(move.id)">{{
            move.name }}</option>
            </select>
        </div>
        <div>
            <div>
                <label for="pokemon">Move 2</label>
            </div>
            <select class="form-control" :required="true" v-model="selectedMoveTwo">
                <option v-for="move in moves" :value="move.id" :key="move.id" :disabled="alreadySelected(move.id)">{{
            move.name }}</option>
            </select>
        </div>
        <div>
            <div>
                <label for="pokemon">Move 3</label>
            </div>
            <select class="form-control" :required="true" v-model="selectedMoveThree">
                <option v-for="move in moves" :value="move.id" :key="move.id" :disabled="alreadySelected(move.id)">{{
            move.name }}</option>
            </select>
        </div>
        <div>
            <div>
                <label for="pokemon">Move 4</label>
            </div>
            <select class="form-control" :required="true" v-model="selectedMoveFour">
                <option v-for="move in moves" :value="move.id" :key="move.id" :disabled="alreadySelected(move.id)">{{
            move.name }}</option>
            </select>
        </div>
        <button @click="updatePokemonByMoveset()">Search</button>
        <div v-if="pokemonByMoveset.length > 0">
            <h2>Pokemons:</h2>
            <div>
                <h1>{{ pokemonByMoveset.name }}</h1>
            </div>
        </div>
    </div>
</template>
