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
                backgroundImage: `linear-gradient(rgb(0, 0, 0, 0.4), rgba(0, 0, 0, 0)), url(/images/leads/${imgNumber}.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }
        }
    },
};
</script>

<template>
    <div class="text-center">
        <UDivider class="my-2" />
        <div class="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 lg:py-0.5 grid-cols-5 cursor-pointer">
            <div v-for="item in items" @click="setActive(item)" :class="{ active: item.IsVisible }"
                class="py-1 sm:text-sm sm:py-2 border border-black m-0.25 md:text-base md:py-3 lg:py-5 hover:bg-cyan-700" 
                :style="getImageStyling(item)">
                <span class="bg-black bg-opacity-50 text-white p-0.5">{{ item.Name }}</span>
            </div>
        </div>
        <Steps class="mt-4" v-for="item in items" :items="item.Steps" v-show="item.IsVisible">test</Steps>
    </div>
</template>
