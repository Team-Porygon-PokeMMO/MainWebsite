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
                return item?.IsVisible ? '➖' : '➕'
            }
            return ''
        },
        getIfCanBeSeen(item: Step) {
            return item?.IsVisible || this.getIfTrick(item)
        }
    },
};
</script>

<style scoped>
.menu-list:hover{
    background: none;
}
</style>

<template>
    <div class="text-justify">
        <ul v-for="item in items" class="menu-list">
            <li class="menu-label m-2" @click="toggleView(item)">
                <span>
                    {{ getIfExpandable(item) }} {{ item.Description }}
                </span>
                <Steps class="m-2" v-if="item?.Steps?.length > 0" :items="item.Steps" v-show="getIfCanBeSeen(item)" />
            </li>
        </ul>
    </div>
</template>
