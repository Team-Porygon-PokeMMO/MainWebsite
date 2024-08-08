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
            this.items.forEach(i => i.IsVisible = false)
            item.IsVisible = !item.IsVisible
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
div.regions {
    padding: 2rem 1rem;
    margin: 0.1rem;
    cursor: pointer;
    border: 1px solid black;
}

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
        <h2 class="p-1">Leads</h2>
        <div class="grid grid-cols-8">
            <div v-for="item in items" @click="setActive(item)" :class="{ active: item.IsVisible }"
                class="regions text-label" :style="getImageStyling(item)">
                <span class="name p-0.25">{{ item.Name }}</span>
            </div>
        </div>
        <h2 class="p-1">Steps</h2>
        <Steps v-for="item in items" :items="item.Steps" v-show="item.IsVisible" />
    </div>
</template>
