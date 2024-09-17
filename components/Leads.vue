<script lang="ts">
import type { PropType } from 'vue';
import nameToDex from '~/src/nameToDex.json'

class Lead {
    Name: string = "";
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
        }
    },
    methods: {
        setActive(item: Lead) {
            this.items.forEach((i) => i !== item ? i.IsVisible = false : i.IsVisible = !item.IsVisible);
        },
        getImageStyling(item: Lead) {
            let imgNumber: string = this.nameToDex[item.Name]
            return {
                backgroundImage: `linear-gradient(rgb(0, 0, 0, 0.5), rgba(0, 0, 0, 0)), url(/images/leads/${imgNumber}.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }
        }
    },
};
</script>

<style scoped>
div.regions:hover {
    background-color: rgba(75, 16, 16, 0.9);
}

.active {
    background-color: rgba(182, 28, 28, 0.15);
}

.name {
    background-color: rgb(0, 0, 0, .25);
}
</style>

<template>
    <div class="text-center">
        <div class="grid py-1 lg:grid-cols-12 md:grid-cols-8 sm:grid-cols-6 lg:py-0.5 cursor-pointer">
            <div v-for="item in items" @click="setActive(item)" :class="{ active: item.IsVisible }" class="sm:text-sm sm:py-2 border border-black m-0.25 md:text-base md:py-3 lg:py-5 regions"
                :style="getImageStyling(item)">
                <span class="name">{{ item.Name }}</span>
            </div>
        </div>
        <Steps v-for="item in items" :items="item.Steps" v-show="item.IsVisible" />
    </div>
</template>
