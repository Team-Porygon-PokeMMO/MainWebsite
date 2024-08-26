<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function handleClick(sublink: any) {
    if (sublink.to) {
        // If the URL starts with "http", it's an external link
        if (sublink.to.startsWith('http')) {
            window.location.href = sublink.to;
        } else {
            router.push(sublink.to);
        }
    } else if (sublink.action) {
        sublink.action();
    }
}
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
    }], 

    [{
        label: 'Team Pory',
        icon: 'i-heroicons-bars-3-bottom-left',
        sublinks: [
            { label: 'Forums Club', to: 'https://forums.pokemmo.com/index.php?/clubs/219-pory-porygon/'},
            { label: 'Shiny Showcase', to: 'https://forums.pokemmo.com/index.php?/topic/159659-pory-ot-shiny-showcase/'},
            { label: 'Missing Shiny Dex', to: 'https://forums.pokemmo.com/index.php?/topic/159671-pory-whose-left-to-shunt/'},
    ]},
    {
        label: 'Common Resources',
        icon: 'i-heroicons-book-open',
        sublinks: [
            { label: 'Pory Guides', to: 'https://forums.pokemmo.com/index.php?/forum/605-poryguides/'},
            { label: 'Apricorn Map', to: 'https://forums.pokemmo.com/index.php?/topic/160158-johto-apricorn-guide/#comment-2025208'},
            { label: 'Berry Farming', to: 'https://www.youtube.com/watch?v=z5BBUKFAvWo&ab_channel=TheClosedBox'},
            { label: 'PokeMMO Hub', to: 'https://pokemmohub.com/'},
            { label: 'Happiness Using Berries', to: 'https://forums.pokemmo.com/index.php?/topic/154921-guide-raising-happiness-using-berries/'},
            { label: 'EV Training and Leveling', to: 'https://forums.pokemmo.com/index.php?/topic/77490-simple-ev-training-leveling-guide-using-horde/'}, 
            { label: 'Money Making Guides', to: 'https://forums.pokemmo.com/index.php?/topic/106742-money-guide-community-pickup-guide-2nd-edition/'},
            { label: 'Catching Breeders', to: 'https://forums.pokemmo.com/index.php?/topic/154142-breed-guide-breeder-catching-engesp/'},
            { label: 'Vanity Index', to: 'https://forums.pokemmo.com/index.php?/topic/145375-pokemmo-vanity-index/'},
    ]},
    {
        label: 'Contact Us', to: 'https://discord.gg/ERegmbRSyz',
        icon: 'i-heroicons-bars-3-bottom-right',
    }
]]
</script>

<template>
    <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800">
        <template #default="{ link }">
            <div class="relative group">
                <span class="group-hover:text-primary relative cursor-pointer" v-if="!link.sublinks">
                    {{ link.label }}
                </span>
                <div v-else>
                    <span class="group-hover:text-primary relative cursor-pointer">
                        {{ link.label }}
                    </span>
                    <!-- Dropdown Menu -->
                    <div class="absolute hidden group-hover:block bg-white dark:bg-gray-800 mt-2 rounded shadow-lg">
                        <ul>
                            <li v-for="sublink in link.sublinks" :key="sublink.label">
                                <button 
                                    @click="handleClick(sublink)"
                                    class="w-full text-left block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    {{ sublink.label }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </template>
    </UHorizontalNavigation>
</template>



