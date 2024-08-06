<script lang="ts">
import eliteFourChangelogs from '~/src/EliteFour/changelog.json'
export type Changelog = {
    Year: number,
    Month: number,
    Day: number,
    Changes: Change[]
}
export type Change = {
    Solve: string
    Description: string
}
export default {
    data() {
        return {
            changelogs: eliteFourChangelogs as Changelog[]
        };
    }
};
</script>

<template>
    <div class="m-6">
        <h1>Elite Four Changelogs</h1>
        <div v-for="changelog in changelogs" :key="changelog.Year + changelog.Month + changelog.Day">
            <h2>{{ changelog.Year }}/{{ changelog.Month }}/{{ changelog.Day }}</h2>
            <ul>
                <li v-for="change in changelog.Changes" :key="change.Solve" class="p-1">
                    <b>{{ change.Solve }}</b>
                    <p>{{ change.Description }}</p>
                </li>
            </ul>
        </div>
    </div>
</template>