<script lang="ts">
class Tip {
    Description: string = "";
    Classes: string[] = [];
    Tips: Tip[] = [];
    IsVisible: boolean = false;
    Url: string | null = null;
    Name: string | null = null;
}
export default {
    props: {
        items: {
            type: Array as PropType<Array<Tip>>,
            required: true,
        },
    },
    methods: {
        toggleView(item: Tip) {
            item.IsVisible = !item.IsVisible
        },
        getIfExpandable(item: Tip) {
            if (item?.Tips?.length > 0) {
                return item?.IsVisible ? '🔽' : '▶️'
            }
            return ''
        },
        getBackgroundColorStyling() {
            return {
                backgroundColor: 'rgb(0,0,0, .2)',
                border: '1px solid rgb(255, 255, 255, .2)',
            }
        },
        getMoreStepsBackgroundColorStyling() {
            return {
                backgroundColor: 'rgb(255,255,255, .25)'
            }
        }
    },
};
</script>

<style scoped>
.link {
    color: rgb(51, 40, 211);
    cursor: pointer;
}
</style>

<template>
    <div class="pl-2 pt-1" :style="getBackgroundColorStyling()">
        <ul v-for="item in items">
            <li class="link" v-if="item.Url">
                <a :href="item.Url ?? ''" target="_blank">{{ item.Name }}</a>
            </li>
            <li v-else>
                <span @click="toggleView(item)" :style="[getIfExpandable(item) ? { cursor: 'pointer' } : {}]">
                    {{ item.Description }} {{ getIfExpandable(item) }}
                </span>
            </li>
            <div class="ml-12 h-4 rounded-full" v-show="getIfExpandable(item) && !item.IsVisible"
                @click="toggleView(item)"
                :style="[getIfExpandable(item) ? { cursor: 'pointer' } : {}, getMoreStepsBackgroundColorStyling()]">
            </div>
            <Tips :items="item?.Tips" v-if="item?.Tips?.length > 0" v-show="item.IsVisible" />
        </ul>
    </div>
</template>
