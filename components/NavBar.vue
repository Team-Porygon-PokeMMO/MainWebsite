<script setup lang="ts">
const links = [[
    {
        label: 'Home', to: '/',
        icon: 'i-heroicons-home'
    },
    {
        label: 'Elite Four', to: '/guides/EliteFour',
        icon: 'i-heroicons-book-open',
    },
    {
        label: 'Current Time', to: '/utilities/DayAndNightCycle',
        icon: 'i-heroicons-clock',
    },
    {
        label: 'Hatching', to: '/utilities/HatchCycleTimer',
        icon: 'i-heroicons-question-mark-circle',
    }], [

    {
        label: 'Forums Club', to: 'https://forums.pokemmo.com/index.php?/clubs/219-pory-porygon/', target: "_blank",
        icon: 'i-heroicons-bars-3-bottom-left',
    },
    {
        label: 'Shiny Showcase', to: 'https://forums.pokemmo.com/index.php?/topic/159659-pory-ot-shiny-showcase/', target: "_blank",
        icon: 'i-heroicons-bars-3   ',
    },
    {
        label: 'Missing Shiny Dex', to: 'https://forums.pokemmo.com/index.php?/topic/159671-pory-whose-left-to-shunt/', target: "_blank",
        icon: 'i-heroicons-bars-3   ',
    },
    {
        label: 'Contact Us', to: 'https://discord.gg/ERegmbRSyz', target: "_blank",
        icon: 'i-heroicons-bars-3-bottom-right',
    }
]]
</script>

<template>
    <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800">
        <template #default="{ link }">
            <span class="group-hover:text-primary relative" v-if="!link.sublinks">{{ link.label }}</span>
        </template>
    </UHorizontalNavigation>
</template>