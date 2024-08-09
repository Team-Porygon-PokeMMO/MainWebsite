<script lang="ts">
import hoennEliteFour from '~/src/EliteFour/hoenn.json'
import kantoEliteFour from '~/src/EliteFour/kanto.json'
import johtopEliteFour from '~/src/EliteFour/johto.json'
import sinnohEliteFour from '~/src/EliteFour/sinnoh.json'
import unovaEliteFour from '~/src/EliteFour/unova.json'
import eliteFourTips from '~/src/EliteFour/tips.json'
export class Tip {
    Description: string = "";
    Classes: string[] = [];
    Tips: Tip[] = [];
    IsVisible: boolean = false;
    Url: string = "";
    Name: string = "";
}
export class Step {
    Description: string = "";
    Classes: string[] = [];
    Steps: Step[] = [];
    IsVisible: boolean = false;
}
export class Trainer {
    Name: string = "";
    IsVisible: boolean = false;
    Leads: Leads[] = [];
    Image?: string;
    ImagePosition?: string;
}
export class Leads {
    Name: string = "";
    IsVisible: boolean = false;
    Steps: Step[] = [];
}
export class Region {
    Name: string = "";
    IsVisible: boolean = false;
    GymTrainers: Trainer[] = [];
}
export default {
    data() {
        return {
            regions: [kantoEliteFour, johtopEliteFour, hoennEliteFour, sinnohEliteFour, unovaEliteFour] as Region[],
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
.menu-label {
    font-size: 18px;
    font-weight: bold;
}

.text-label{
    font-size: 18px;
    font-weight: bold;
}

.menu-list {
    list-style: none;
}

.menu-list a {
    display: block;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.strong {
    font-weight: bold;
}

.main {
    min-height: 100%;
}

.pointer {
    cursor: pointer;
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
            <h2>Elite Four</h2>
        </div>
        <div class="menu p-4">
            <p class="menu-label pointer" @click="toggleTips()">
                Tips {{ tipsVisible ?
                    "🔽" : "▶️" }}
            </p>
            <ul class="menu-list text-label" v-show="tipsVisible">
                <Tips :items="tips" />
            </ul>
            <Regions :items="regions" class="menu-list" />
        </div>
        <EliteFourCredits />
    </div>
</template>