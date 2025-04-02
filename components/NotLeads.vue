<script lang="ts">
import type { PropType } from 'vue';
import nameToDex from '~/src/nameToDex.json'

class Lead {
    Name: string = "";
    IsGenSelected: boolean = false;
    IsPokemonStartSelected: boolean = false;
    IsVisible: boolean = false;
    Steps: Step[] = [];
}

class Step {
    Description: string = "";
    Classes: string[] = [];
    Steps: Step[] = [];
    IsVisible: boolean = false;
}
interface IDictionary {
    [index: string]: string;
}
export default {
    props: {
        items: {
            type: Array as PropType<Array<Lead>>,
            required: true,
        },
    },
    data() {
        return {
            nameToDex: nameToDex as IDictionary
        };
    },
    computed: {
        typedItems(): Lead[] {
            return this.items as Lead[];
        }
    },
    methods: {
        setGenActive(item: Lead) {
            this.typedItems.forEach((i) => i !== item ? i.IsGenSelected = false : i.IsGenSelected = !item.IsGenSelected);
        },
        setPokemonStartActive(item: Lead) {
            this.typedItems.forEach((i) => i !== item ? i.IsPokemonStartSelected = false : i.IsPokemonStartSelected = !item.IsPokemonStartSelected);
        },
        setActive(item: Lead) {
            this.typedItems.forEach((i) => i !== item ? i.IsVisible = false : i.IsVisible = !item.IsVisible);
        },
        getImageStyling(item: Lead) {
            let imgNumber: string = this.nameToDex[item.Name];
            return {
                backgroundImage: `linear-gradient(rgb(0, 0, 0, 0.4), rgba(0, 0, 0, 0)), url(/images/leads/${imgNumber}.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            };
        }
    }
};
</script>

<template>
    <div class="text-center">
        <UDivider class="my-2" />
        
        <!-- First Grid: Gen Selection -->
        <div class="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-5 cursor-pointer">
            <div v-for="item in items" @click="setGenActive(item)" :class="{ active: item.IsGenSelected }"
                class="py-1 sm:text-sm sm:py-2 border border-black m-0.25 md:text-base md:py-3 lg:py-5 hover:bg-cyan-700"
                :style="getImageStyling(item)">
                <span class="bg-black bg-opacity-50 text-white p-0.5">{{ item.Name }}</span>
            </div>
        </div>

        <!-- Second Grid: Pokemon Start (only visible when Gen is selected) -->
        <div v-if="items.some(i => i.IsGenSelected)" class="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-5 cursor-pointer mt-4">
            <div v-for="item in items" @click="setPokemonStartActive(item)" :class="{ active: item.IsPokemonStartSelected }"
                class="py-1 sm:text-sm sm:py-2 border border-black m-0.25 md:text-base md:py-3 lg:py-5 hover:bg-cyan-700">
                <span class="bg-black bg-opacity-50 text-white p-0.5">Pokemon Start</span>
            </div>
        </div>

        <!-- Steps: only visible when Pokemon Start is selected -->
        <Steps class="mt-4" v-for="item in items" :items="item.Steps" v-show="item.IsPokemonStartSelected">test</Steps>
    </div>
</template>
