<script lang="ts">
export class Tip {
    Description: string = "";
    Classes: string[] = [];
    Tips: Tip[] = [];
    IsVisible: boolean = false;
    Url: string | null = null;
    Name: string | null = null;
}
export default {
    props: {
        currentTip: {
            type: Tip,
            required: true,
        },
    },
    methods: {
        toggleView() {
            this.currentTip.IsVisible = !this.currentTip.IsVisible
        },
        getIfExpandable() {
            if (this.currentTip?.Tips?.length > 0) {
                return this.currentTip?.IsVisible ? '🔽' : '▶️'
            }
            return ''
        }
    },
};
</script>

<style scoped>
.link {
    color: lightblue;
    cursor: pointer;
}
</style>

<template>
    <div class="pl-2 pt-1">
        <ul v-if="currentTip.Url">
            <li class="link">
                <a :href="currentTip.Url ?? ''" target="_blank">{{ currentTip.Name }}</a>
            </li>
        </ul>
        <ul v-if="!currentTip.Url">
            <li @click="toggleView()">
                {{ currentTip.Description }} {{ getIfExpandable() }}
            </li>
        </ul>
        <Tips v-for="subTip in currentTip.Tips" :currentTip="subTip" v-show="currentTip.IsVisible" />
    </div>
</template>
