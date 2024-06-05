<script setup lang="ts">
const links = [
    { label: 'Home', to: '/' },
    { label: 'PokeMMO Clock and Time', to: '/DayAndNightCycle' },
    { label: 'Hatch Cycle Timer', to: '/HatchCycleTimer' },
    { label: 'Elite Four Guide', to: '/EliteFour' },
    { label: 'PokéMMO', to: 'https://pokemmo.eu/', target: "_blank" },
    { label: 'Forums Club', to: 'https://forums.pokemmo.com/index.php?/clubs/219-pory-porygon/', target: "_blank" },
    { label: 'Shiny Showcase', to: 'https://forums.pokemmo.com/index.php?/topic/159659-pory-ot-shiny-showcase/', target: "_blank" },
    { label: 'Missing Shiny Dex', to: 'https://forums.pokemmo.com/index.php?/topic/159671-pory-whose-left-to-shunt/', target: "_blank" }
]
</script>

<template>
    <nav class="w-full p-2 shadow-md">
        <UContainer>
            <UButton v-for="link in links" :key="link.label" :to="link.to" :target="link.target" class="m-1">
                {{ link.label }}
            </UButton>
        </UContainer>
    </nav>
</template>