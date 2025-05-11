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
            type: Array as PropType<Array<Region>>,  // Notice this type is now for regions
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
                    backgroundImage: `linear-gradient(rgb(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2)), url(${item.Image})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: '50%',
                    height: '300px',
                }
            }
        }
    },
};
</script>

<template>
    <div class="text-center">
        <!-- Region Selector: List of Regions -->
        <div class="grid grid-cols-1 justify-items-center lg:py-0.5 cursor-pointer">
            <div v-for="item in items" @click="setActive(item)" :class="{ active: item.IsVisible }"
                class="py-1 sm:text-sm sm:py-2 border border-black m-0.25 md:text-base md:py-3 lg:py-5 hover:bg-cyan-700"
                :style="getImageStyling(item)">
               
            </div>
        </div>

        <!-- Trainers within the selected Region -->
        <NotTrainers v-for="item in items" :items="item.GymTrainers" v-show="item.IsVisible" />
    </div>
</template>
