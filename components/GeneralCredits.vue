<script lang="ts">
type Credit = {
    Name?: string,
    Tag?: string
}
let baseCredits: { [id: string]: Credit; } = {};
baseCredits["dronad"] = {
    Name: "Dronad",
    Tag: "@dronad"
}
baseCredits["jaddee"] = {
    Name: "Jaddee",
    Tag: "@vexious"
}
baseCredits["shrimplad"] = {
    Name: "Shrimplad",
    Tag: "@shrimp_."
}
baseCredits["panotxa"] = {
    Name: "Panotxa",
    Tag: "@panotxa22"
}
baseCredits["dareeka"] = {
    Name: "Dareeka",
    Tag: "@dareeka"
}
baseCredits["tcb"] = {
    Name: "TheClosedBox",
    Tag: "@theclosedbox"
}
baseCredits["Team Porygon"] = {
    Name: "Team Porygon"
}
baseCredits["c4v"] = {
    Name: "caav",
    Tag: "@c4v"
}
baseCredits["SlyferTP"] = {
    Name: "SlyferTP",
    Tag: "@slyfer99"
}
const fullCredits = [
    {
        Name: "Page Design",
        Credits: ["jaddee", "tcb"]
    },
    {
        Name: "Code Contributors",
        Credits: ["jaddee"]
    },
    {
        Name: "Art",
        Credits: ["SlyferTP"]
    }
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
            <div v-for="(creditSection, index) in fullCredits" :key="index">
                <UDivider class="p-2" v-if="index > 0" />
                <span class="menu-label">{{ creditSection.Name }}</span>
                <div class="grid grid-flow-col-dense auto-cols-auto">
                    <div v-for="(credit, i) in creditSection.Credits" :key="i">
                        <span class="mr-2">{{ getCredit(credit) }}</span> <!-- Add margin -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
