<script lang="ts">
import type { PropType } from 'vue';
import nameToDex from '~/src/nameToDex.json'

export class Lead {
    Name: string = "";
    IsVisible: boolean = false;
    Steps: Step[] = [];
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
            type: Array as PropType<Array<Lead>>,
            required: true,
        },
    },
    methods: {
        setActive(item: Lead) {
            this.items.forEach(i => i.IsVisible = false)
            item.IsVisible = !item.IsVisible
        },
        getImageStyling(item: Lead) {
            let imgNumber:string = nameToDex[item.Name];
            return {
                backgroundImage: `linear-gradient(rgb(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(/images/leads/${imgNumber}.png)`,
                backgroundSize: 'cover',
                backgroundPosition: item?.ImagePosition ?? '25% 15%',
                width: '100%',
                height: '100%',
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
    background-color: rgba(75, 16, 16, 0.534);
}

.active {
    background-color: rgba(182, 28, 28, 0.39);
}
</style>

<template>
    <div class="text-center">
        <h2 class="p-1">Leads</h2>
        <div class="grid grid-cols-8">
            <div v-for="item in items" @click="setActive(item)" :class="{ active: item.IsVisible }" class="regions text-label"
              :style="getImageStyling(item)">
                {{ item.Name }}
            </div>
        </div>
        <h2 class="p-1">Steps</h2>
        <Steps v-for="item in items" :items="item.Steps" v-show="item.IsVisible" />
    </div>
</template>
