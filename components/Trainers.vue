<script lang="ts">
export class Trainer {
    Name: string = "";
    IsVisible: boolean = false;
    Leads: Lead[] = [];
}
export class Lead {
    Name: string = "";
    IsVisible: boolean = false;
    Steps: Step[] = [];
}
export class Step {
    Description: string = "";
    Classes: string[] = [];
    Steps: Step[] = [];
    IsVisible: boolean = false;
}
export default {
    props: {
        current: {
            type: Trainer,
            required: true,
        },
    },
    methods: {
        toggleView() {
            this.current.IsVisible = !this.current.IsVisible
        },
        getIfExpandable() {
            if (this.current?.Leads?.length > 0) {
                return this.current?.IsVisible ? '🔽' : '▶️'
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
        <ul>
            <li @click="toggleView()">
                {{ current.Name }} {{ getIfExpandable() }}
            </li>
        </ul>
        <Leads v-for="lead in current.Leads" :current="lead" v-show="current.IsVisible" />
    </div>
</template>
