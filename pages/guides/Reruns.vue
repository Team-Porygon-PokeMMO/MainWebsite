<script lang="ts">
import hooh from '~/src/Weeklys/hooh2.json'
import accreditation from '~/src/Weeklys/weeklyAccreditation.json'
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
            regions: [hooh] as Region[],
            tips: accreditation as unknown as Tip[],
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
            <h2 class="text-center">Re-runs</h2>
            <h3 class="text-center">Blep.</h3>
        </div>
        <div class="menu p-4">
            <p class="menu-label cursor-pointer text-lg" @click="toggleTips()">
                {{ tipsVisible ?
                    "▼" : "▶" }} Accreditation
            </p>
            <ul class="menu-list text-label" v-show="tipsVisible">
                <NotTips :items="tips" />
            </ul>
            <NotRegions :items="regions" class="menu-list" />
        </div>
        <NotCredits />
    </div>
</template>