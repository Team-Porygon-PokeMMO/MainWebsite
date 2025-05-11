<script lang="ts">
type Credit = {
    Name?: string,
    Tag?: string
}
let rerunCredits: { [id: string]: Credit; } = {};
rerunCredits["denzi"] = {
    Name: "FreeReign",
    Tag: "@denzi_norski"
}
rerunCredits["juggerton"] = {
    Name: "Juggerton"
}
rerunCredits["dronad"] = {
    Name: "Dronad",
    Tag: "@dronad"
}
rerunCredits["jaddee"] = {
    Name: "Jaddee",
    Tag: "@vexious"
}
rerunCredits["shrimplad"] = {
    Name: "Shrimplad",
    Tag: "@shrimp_."
}
rerunCredits["panotxa"] = {
    Name: "Panotxa",
    Tag: "@panotxa22"
}
rerunCredits["dareeka"] = {
    Name: "Dareeka",
    Tag: "@dareeka"
}
rerunCredits["manitos"] = {
    Name: "Manitos",
    Tag: "@manitoss"
}
rerunCredits["jerizzle"] = {
    Name: "Jerizzle",
    Tag: "@jiro.san"
}
rerunCredits["tcb"] = {
    Name: "TheClosedBox",
    Tag: "@theclosedbox"
}
rerunCredits["Team Porygon"] = {
    Name: "Team Porygon"
}
rerunCredits["jeriel"] = {
    Name: "Odozo",
    Tag: "@jeriel.xyz"
}
rerunCredits["c4v"] = {
    Name: "caav",
    Tag: "@c4v"
}
rerunCredits["SlyferTP"] = {
    Name: "SlyferTP",
    Tag: "@slyfer99"
}
const fullCredits = [
    {
        Name: "Page Design",
        Credits: ["jaddee"]
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
            credits: rerunCredits
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
