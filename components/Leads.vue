<script lang="ts">
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
            type: Lead,
            required: true,
        },
    },
    methods: {
        toggleView() {
            this.current.IsVisible = !this.current.IsVisible
        },
        getIfExpandable() {
            if (this.current?.Steps?.length > 0) {
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
        <Steps v-for="step in current.Steps" :current="step" v-show="current.IsVisible" />
    </div>
</template>
