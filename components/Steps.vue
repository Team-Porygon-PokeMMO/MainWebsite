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
        getMoreStepsBackgroundColorStyling() {
            return {
                backgroundColor: 'rgb(155, 25, 25, .75)'
            }
        }
    },
};
</script>

<style scoped>
.menu-list:hover {
    background: none;
}

.expandable {
    margin-top: .15rem;
}
</style>

<template>
    <div class="text-justify" :style="getBackgroundColorStyling()">
        <ul v-for="item in items" class="menu-list relative">
            <div class="absolute left-0 expandable">{{ getIfExpandable(item) ? item.IsVisible ? '🔽' : '▶️' : '' }}
            </div>
            <li class="menu-label ml-3">
                <span @click="toggleView(item)" :style="[getIfExpandable(item) ? { cursor: 'pointer' } : {}]">
                    {{ item.Description }}
                </span>
            </li>

            <div class="ml-12 h-4 rounded-full" v-show="getIfExpandable(item) && !item.IsVisible"
                @click="toggleView(item)"
                :style="[getIfExpandable(item) ? { cursor: 'pointer' } : {}, getMoreStepsBackgroundColorStyling()]">
            </div>
            <Steps class="ml-8" v-if="item?.Steps?.length > 0" :items="item.Steps" v-show="getIfCanBeSeen(item)" />
        </ul>
    </div>
</template>
