<script lang="ts">
import type { PropType } from 'vue';
export class Trainer {
    Name: string = "";
    IsVisible: boolean = false;
    Leads: Lead[] = [];
    Image?: string;
    ImagePosition?: string;
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
        },
        getImageStyling(item: Trainer) {
            if (item.Image) {
                return {
                    backgroundImage: `linear-gradient(rgb(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(${item.Image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: item?.ImagePosition ?? '25% 15%',
                    width: '100%',
                    height: '100%',
                }
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
        <h2 class="p-1">Trainers</h2>
        <div class="grid grid-cols-5">
            <div v-for="item in items" @click="setActive(item)" :class="{ active: item.IsVisible }" class="regions text-label"
                :style="getImageStyling(item)">
                <span class="name">{{ item.Name }}</span>
            </div>
        </div>
        <Leads v-for="item in items" :items="item.Leads" v-show="item.IsVisible" />
    </div>
</template>
