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
/* Menu styles */
.menu {
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.menu-label {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

.menu-list {
    list-style: none;
}

.menu-list li {
    margin: 0.125rem 0;
}

.menu-list a {
    display: block;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.menu-list a:hover {
    background-color: grey;
}

/* Expansion styles */
.expansion {
    margin-top: 10px;
    background-color: #f0f0f0;
    border-radius: 4px;
    padding: 10px;
}

.expansion ul {
    list-style: none;
    padding: 0;
}

.expansion li {
    margin-bottom: 5px;
}

.expansion a {
    text-decoration: none;
}

.expansion a:hover {
    text-decoration: underline;
}

.strong {
    font-weight: bold;
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
    <UContainer>
        <UCard>
            <div class="p-2">
                <h2>Elite Four</h2>
            </div>
            <aside class="menu p-5 m-0">
                <p class="menu-label" @click="toggleTips()">
                    Tips {{ tipsVisible ?
                        "🔽" : "▶" }}
                </p>
                <ul class="menu-list m-2" v-show="tipsVisible">
                    <Tips v-for="tip in tips" :currentTip="tip" />
                </ul>
                <p class="menu-label">
                    Regions
                </p>
                <ul class="menu-list m-2">
                    <Regions v-for="region in regions" :current="region" />
                </ul>
            </aside>
        </UCard>
    </UContainer>
</template>