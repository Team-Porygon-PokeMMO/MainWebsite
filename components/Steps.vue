<script lang="ts">
export class Step {
    Description: string = "";
    Classes: string[] = [];
    Steps: Step[] = [];
    IsVisible: boolean = false;
}
export default {
    props: {
        items: {
            type: Array as PropType<Array<Step>>,
            required: true,
        },
    },
    methods: {
        toggleView(item: Step) {
            if (this.getIfTrick(item)) return
            item.IsVisible = !item.IsVisible
        },
        getIfTrick(item: Step) {
            return item?.Description?.length <= 32
        },
        getIfExpandable(item: Step) {
            if (item?.Steps?.length > 0 && !this.getIfTrick(item)) {
                return true
            }
            return false
        },
        getIfCanBeSeen(item: Step) {
            return item?.IsVisible || this.getIfTrick(item)
        },
        getBackgroundColorStyling() {
            return {
                backgroundColor: 'rgb(0,0,0, .2)',
                border: '1px solid rgb(255, 255, 255, .2)',
            }
        },
    },
};
</script>

<style scoped>
.show-more {
    margin-right: 35%
}
</style>

<template>
    <div class="text-left">
        <div v-for="item in items" class="relative text-cool-50 tracking-tight text-sm md:text-base lg:text-lg">
            <div class="border py-0.25 px-0.5 rounded my-1 border-cool-700">
                <div class="absolute left-1.5" @click="toggleView(item)"
                    :style="[getIfExpandable(item) ? { cursor: 'pointer' } : {}]">{{
                        getIfExpandable(item) ? item.IsVisible ? '▼' : '▶' : '' }}
                </div>
                <div class="ml-6" v-if="getIfExpandable(item)">
                    <span @click="toggleView(item)" :style="[getIfExpandable(item) ? { cursor: 'pointer' } : {}]">
                        {{ item.Description }}
                    </span>
                </div>
                <div v-else class="ml-2">
                    {{ item.Description }}
                </div>

                <div class="ml-8 mb-1 h-2 text-center items-center rounded-full bg-blue-800 show-more hover:animate-pulse"
                    v-show="getIfExpandable(item) && !item.IsVisible" @click="toggleView(item)"
                    :style="[getIfExpandable(item) ? { cursor: 'pointer' } : {}]">
                </div>
                <Steps class="ml-4" v-if="item?.Steps?.length > 0" :items="item.Steps" v-show="getIfCanBeSeen(item)" />
            </div>
        </div>
    </div>
</template>
