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
                return item?.IsVisible ? '▼ ' : '▶'
            }
            return ''
        }
    },
};
</script>

<template>
    <div class="text-left bg-cool-950 bg-opacity-85">
        <div v-for="item in items"
            class="relative text-cool-50 text-lg tracking-tight sm:text-sm md:text-base lg:text-lg">
            <div class="border py-0.25 px-0.5 rounded my-1 border-cool-700">
                <div class="absolute left-1.5" @click="toggleView(item)"
                    :style="[getIfExpandable(item) ? { cursor: 'pointer' } : {}]">{{
                        getIfExpandable(item) ? item.IsVisible ? '▼' : '▶' : '' }}
                </div>
                <div class="link ml-2 text-blue-600" v-if="item.Url">
                    <a :href="item.Url ?? ''" target="_blank">{{ item.Name }}</a>
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
                    :style="[getIfExpandable(item) ? { cursor: 'pointer' } : {},]">
                </div>
                <Tips class="ml-4" :items="item?.Tips" v-if="item?.Tips?.length > 0" v-show="item.IsVisible" />
            </div>
        </div>
    </div>
</template>
