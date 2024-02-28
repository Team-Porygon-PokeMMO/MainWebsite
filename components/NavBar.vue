<script setup lang="ts">
const links = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Members', to: '/members' },
    { label: 'Shiny Showcase', to: '/shinyshowcase' },
    { label: 'News', to: '/news' },

]
</script>

<template>
    <nav class="w-full p-2 shadow-md">
        <UContainer>
            <UButton v-for="link in links" :key="link.label" :to="link.to" class="m-1">
                {{ link.label }}
            </UButton>
        </UContainer>
    </nav>
</template>