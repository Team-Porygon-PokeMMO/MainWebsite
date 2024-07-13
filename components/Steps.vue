<script lang="ts">
import { Step } from '~/types/EliteFour.types.vue'
export default {
    props: {
        currentStep: {
            type: Step,
            required: true,
        },
    },
    methods: {
        toggleView() {
            this.currentStep.IsVisible = !this.currentStep.IsVisible
        },
        getIfExpandable() {
            return this.currentStep?.Steps?.length > 0 ? '▶' : ''
        },
    },
};
</script>

<style scoped>
/* Add your component styles here */
</style>

<template>
    <div class="pl-10 pt-2">
        <ul>
            <li @click="toggleView()">
                {{ getIfExpandable() }} {{ currentStep.Description }}
            </li>
        </ul>
        <Steps v-for="subStep in currentStep.Steps" :currentStep="subStep" v-show="currentStep.IsVisible" />
    </div>
</template>
