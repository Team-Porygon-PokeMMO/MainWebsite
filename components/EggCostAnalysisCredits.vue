<script lang="ts">
type Credit = {
    Name?: string,
    Tag?: string
}
let baseCredits: { [id: string]: Credit; } = {};
baseCredits["jaddee"] = {
    Name: "Jaddee",
    Tag: "@vexious"
}
baseCredits["tcb"] = {
    Name: "TheClosedBox",
    Tag: "@theclosedbox"
}
baseCredits["Team Porygon"] = {
    Name: "Team Porygon"
}
baseCredits["Ampyros"] = {
    Name: "Ampyros",
    Tag: "@Ampyros"
}
const fullCredits = [
    {
        Name: "Mathematics & Documentation",
        Credits: ["tcb", "Ampyros"]
    },
    
    {
        Name: "Page Design & Code Contributors",
        Credits: ["jaddee"]
    },
    
]
export default {
    data() {
        return {
            active: false,
            fullCredits: fullCredits,
            credits: baseCredits
        };
    },
    methods: {
        toggleView() {
            this.active = !this.active
        },
        getIfExpandable() {
            return this.active ? '▼' : '▶'
        },
        getCredit(tag: string) {
            if (this.credits[tag].Tag) {
                return `${this.credits[tag].Name} (${this.credits[tag].Tag})`
            }
            return this.credits[tag]?.Name
        },
    },
};
</script>

<style scoped>
.title {
    cursor: pointer;
}
</style>

<template>
    <UDivider class="p-2" />
    <div class="text-center">
        <h3 class="m-4 menu-label title" @click="toggleView()">Credits {{ getIfExpandable() }}</h3>
        <div v-if="active">
            <div v-for="(creditSection, index) in fullCredits">
                <UDivider class="p-2" v-if="index > 0" />
                <span class="menu-label">{{ creditSection.Name }}</span>
                <div class="grid grid-flow-col-dense auto-cols-auto">
                    <div v-for="credit in creditSection.Credits">
                        <span>{{ getCredit(credit) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
