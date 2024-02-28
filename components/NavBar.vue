<script setup lang="ts">
const links = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' }
]
</script>

<template>
    <nav class="bg-neutral-800 w-full">
        <UContainer>
            <UButton v-for="link in links" :key="link.label" :to="link.to" class="text-neutral-100">
                {{ link.label }}
            </UButton>
        </UContainer>
    </nav>
</template>