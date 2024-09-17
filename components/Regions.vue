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
            this.items.forEach((i) => i !== item ? i.IsVisible = false : i.IsVisible = !item.IsVisible);
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
        <div class="grid sm:grid-cols-5 lg:py-0.5 cursor-pointer">
            <div v-for="item in items" @click="setActive(item)" :class="{ active: item.IsVisible }"
                class="sm:text-sm sm:py-2 border border-black m-0.25 md:text-base md:py-3 lg:py-5 regions" :style="getImageStyling(item)">
                <span>{{ item.Name }}</span>
            </div>
        </div>
        <Trainers v-for="item in items" :items="item.GymTrainers" v-show="item.IsVisible" />
    </div>
</template>
