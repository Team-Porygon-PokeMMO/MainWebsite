<script lang="ts">
import type { PropType } from 'vue';
export class Trainer {
    Name: string = "";
    IsVisible: boolean = false;
    Leads: Lead[] = [];
}
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
            type: Array as PropType<Array<Trainer>>,
            required: true,
        },
    },
    methods: {
        setActive(item: Trainer) {
            this.items.forEach(i => i.IsVisible = false)
            item.IsVisible = !item.IsVisible
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
    background-color: rgb(0, 0, 0, 1);
}

.active {
    background-color: rgba(182, 28, 28, 0.39);
}
</style>

<template>
    <div class="text-center">
        <h2 class="p-4">Trainers</h2>
        <div class="grid grid-cols-5">
            <div v-for="item in items" @click="setActive(item)" :class="{ active: item.IsVisible }" class="regions">
                {{ item.Name }}
            </div>
        </div>
        <Leads v-for="item in items" :items="item.Leads" v-show="item.IsVisible" />
    </div>
</template>

