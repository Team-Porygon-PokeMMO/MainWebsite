<script lang="ts">
import eliteFourTips from '~/src/EliteFour/tips.json'
import { kantoEliteFour } from '~/src/EliteFour/Kanto/index'
import { Region, Tip } from '~/utilities/datatypes'
export default {
    data() {
        return {
            // regions: [kantoEliteFour, johtopEliteFour, hoennEliteFour, sinnohEliteFour, unovaEliteFour] as Region[],
            regions: [kantoEliteFour] as Region[],
            tips: eliteFourTips as Tip[],
            tipsVisible: false
        };
    },
    methods: {
        toggleView(option: any) {
            option.IsVisible = !option.IsVisible
        },
        toggleTips() {
            this.tipsVisible = !this.tipsVisible
        }
    },

};
</script>

<style>
.main {
    min-height: 100%;
}

.active {
    background-color: rgba(51, 3, 3, 0.95);
}

/* Responsive styles */
@media (max-width: 768px) {
    .menu {
        padding: 10px;
    }

    .menu-list a {
        padding: 8px;
    }
}
</style>

<template>
    <div class="m-4 main">
        <div class="p-2">
            <h2 class="text-center">Elite Four</h2>
            <h3 class="text-center">Pre-Requisites:</h3>
            <h3 class="text-center">This guide is based around the recommended team (Seen under Tips). Straying from
                this team could possibly lead to issues.</h3>
            <h3 class="text-center">Players must complete each E4 in each region 5 times before guides will be accurate.
            </h3>
            <h3 class="text-center">Solves assume the team is properly itemed for each battle, and healed to full health
                after each fight.</h3>
        </div>
        <h3 class="text-center"></h3>
        <div class="p-2"></div>
        <h3 class="text-center">Note:</h3>
        <h3 class="text-center">Using budget teams can introduce issues and cause inaccuracies. Solves do not
            accommodate this.</h3>
        <div class="menu p-4">
            <p class="menu-label cursor-pointer text-lg" @click="toggleTips()">
                {{ tipsVisible ?
                    "▼" : "▶" }} Tips
            </p>
            <ul class="menu-list text-label" v-show="tipsVisible">
                <Tips :items="tips" />
            </ul>
            <Regions :items="regions" class="menu-list" />
        </div>
        <EliteFourCredits />
    </div>
</template>