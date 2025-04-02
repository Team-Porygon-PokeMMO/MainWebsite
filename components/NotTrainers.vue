<script lang="ts">
import { type PropType } from 'vue';

// Your existing classes and types
export class Trainer {
    Name: string = "";
    IsVisible: boolean = false;
    Leads: Lead[] = [];
    Image?: string;
    ImagePosition?: string;
}

interface Lead {
    Name: string;
    IsGenSelected: boolean;
    IsPokemonStartSelected: boolean;
    IsVisible: boolean;
    PokemonStartOptions?: PokemonStart[];  // Optional now
}

interface Gen {
    Name: string;
    IsVisible: boolean;
    Image: string;
    ImagePosition: string;
    GymTrainers: GymTrainer[];
    
}

interface GymTrainer {
    Name: string;
    IsVisible: boolean;
    Image: string;
    ImagePosition: string;
    Leads: Lead[];
}

interface PokemonStart {
    Name: string;
    Steps: Step[];
}

export class Step {
    Description: string = "";
    Classes: string[] = [];
    Steps: Step[] = [];
    IsVisible: boolean = false;
}

export default {
    props: {
        items: {
            type: Array as PropType<Array<Trainer>>,  // Change Gen to Trainer
            required: true,
        },
    },
    data() {
        return {
            selectedTrainer: null as Trainer | null,  // Change selectedGen to selectedTrainer
            selectedPokemon: null as PokemonStart | null,  // Selected Pokémon
        };
    },
    methods: {
        setTrainerActive(item: Trainer) {
            this.selectedTrainer = item;  // Set selected Trainer
            this.selectedPokemon = null;  // Reset selected Pokémon
        },
        setPokemonStartActive(pokemon: PokemonStart | null) {
            if (pokemon) {
                this.selectedPokemon = pokemon;  // Select Pokémon if not null
            } else {
                this.selectedPokemon = null;  // Reset if null
            }
        },
        getImageStyling(item: Trainer) {
            if (item.Image) {
                return {
                    backgroundImage: `linear-gradient(rgb(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)), url(${item.Image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: item?.ImagePosition ?? '25% 15%',
                    width: '100%',
                    height: '100%',
                };
            }
        }
    },
};
</script>

<template>
    <div class="text-center">
        <UDivider class="my-2" />

        <!-- Trainer Selection -->
        <div class="grid grid-cols-5">
            <div
                v-for="item in items"
                :key="item.Name"
                @click="setTrainerActive(item)"
                :class="{ active: selectedTrainer?.Name === item.Name }"
                class="border border-black p-2 cursor-pointer"
            >
                {{ item.Name }}
            </div>
        </div>

        <!-- Pokémon Selection (Visible when a Trainer is selected) -->
        <div v-if="selectedTrainer" class="grid grid-cols-5 mt-4">
            <div
                v-for="lead in selectedTrainer.Leads"
                :key="lead.Name"
                @click="setPokemonStartActive(lead.PokemonStartOptions ? lead.PokemonStartOptions[0] : null)" 
                :class="{ active: selectedPokemon?.Name === lead.Name }"
                class="border border-black p-2 cursor-pointer"
            >
                {{ lead.Name }}
            </div>
        </div>

        <!-- Steps (Visible when a Pokémon is selected) -->
        <div v-if="selectedPokemon" class="mt-4">
            <h3>Steps for {{ selectedPokemon.Name }}</h3>
            <div v-for="step in selectedPokemon.Steps" :key="step.Description">
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
