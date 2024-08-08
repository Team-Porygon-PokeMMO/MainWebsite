<script setup>
import { contributors } from '~/src/data.json'
const formatContributors = () => {
    return contributors.join(', ')
}
</script>

<template>
    <footer class="text-right p-2 pr-4 opacity-10">
        Brought to you by: {{ formatContributors() }}
    </footer>
</template>