<script lang="ts">
import type { PropType } from 'vue';
export class Region {
    Name: string = "";
    IsVisible: boolean = false;
    GymTrainers: Trainer[] = [];
    Image?: string;
    ImagePosition?: string;
}
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
            type: Array as PropType<Array<Region>>,
            required: true,
        },
    },
    methods: {
        setActive(item: Region) {
            this.items.forEach(i => i.IsVisible = false)
            item.IsVisible = !item.IsVisible
        },
        getImageStyling(item: Region) {
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
    background-color: rgba(87, 9, 9, 0.9);
}

.active {
    background-color: rgba(238, 11, 11, 0.15);
}

.name {
    background-color: rgb(0, 0, 0, .25);
}
</style>

<template>
    <div class="text-center mt-4">
        <div class="grid grid-cols-5">
            <div v-for="item in items" @click="setActive(item)" :class="{ active: item.IsVisible }"
                class="regions text-label" :style="getImageStyling(item)">
                <span class="name">{{ item.Name }}</span>
            </div>
        </div>
        <Trainers v-for="item in items" :items="item.GymTrainers" v-show="item.IsVisible" />
    </div>
</template>
