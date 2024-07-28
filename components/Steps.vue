<script lang="ts">
import { Step } from '~/types/EliteFour.types.vue'
export default {
    props: {
        currentStep: {
            type: Step || Object,
            required: true,
        },
    },
    methods: {
        toggleView() {
            this.currentStep.IsVisible = !this.currentStep.IsVisible
        },
        getIfTrick() {
            return this.currentStep?.Description?.length <= 8
        },
        getIfExpandable() {
            if (this.currentStep?.Steps != null && !this.getIfTrick()) {
                return this.currentStep?.IsVisible ? '🔽' : '▶️'
            }
            return ''
        }
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
        <Steps v-for="subStep in currentStep.Steps" :currentStep="subStep" v-show="currentStep.IsVisible || getIfTrick()" />
    </div>
</template>
