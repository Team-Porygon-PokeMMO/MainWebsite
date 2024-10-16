<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { useRouter } from 'vue-router';
import e4Image from '@/assets/images/e4png120x40.png';


const router = useRouter();

interface Link {
    label: string,
    to: string,
    icon: string,
    image?: string;
    sublinks?: Link[]
}

// Define left and right links based on your original links array
const leftLinks = [
    {
        label: 'Home', to: '/',
        icon: 'i-heroicons-home'
    },
    {
        //label: e4Image, 
        to: '/guides/EliteFour',
        icon: 'i-heroicons-book-open',
        image: e4Image,
    },
    {
        label: 'Utilities',
        icon: 'i-heroicons-circle-stack',
        sublinks: [
            {
                label: 'Current Time', to: '/utilities/DayAndNightCycle',
            },
            {
                label: 'Hatching', to: '/utilities/HatchCycleTimer',
                icon: 'i-heroicons-question-mark-circle',
            },
            {
                label: 'Rock Smash Tracker',
                to: '/utilities/RockSmash',
            },
             {
                 label: 'Egg Cost Analysis', to: '/utilities/EggCostAnalysis',
             }, 
        ]
    }
] as Link[]

const rightLinks = [
    {
        label: 'Team Pory',
        icon: 'i-heroicons-bars-3-bottom-left',
        sublinks: [
            { label: 'Forums Club', to: 'https://forums.pokemmo.com/index.php?/clubs/219-pory-porygon/' },
            { label: 'Shiny Showcase', to: 'https://forums.pokemmo.com/index.php?/topic/159659-pory-ot-shiny-showcase/' },
            { label: 'Missing Shiny Dex', to: 'https://forums.pokemmo.com/index.php?/topic/159671-pory-whose-left-to-shunt/' },
        ]
    },
    {
        label: 'Common Resources',
        icon: 'i-heroicons-book-open',
        sublinks: [
            { label: 'Pory Guides', to: 'https://forums.pokemmo.com/index.php?/forum/605-poryguides/' },
            { label: 'Apricorn Map', to: 'https://forums.pokemmo.com/index.php?/topic/160158-johto-apricorn-guide/#comment-2025208' },
            { label: 'Berry Farming', to: 'https://www.youtube.com/watch?v=z5BBUKFAvWo&ab_channel=TheClosedBox' },
            { label: 'PokeMMO Hub', to: 'https://pokemmohub.com/' },
            { label: 'Happiness Using Berries', to: 'https://forums.pokemmo.com/index.php?/topic/154921-guide-raising-happiness-using-berries/' },
            { label: 'EV Training and Leveling', to: 'https://forums.pokemmo.com/index.php?/topic/77490-simple-ev-training-leveling-guide-using-horde/#comment-1515139' },
            { label: 'Money Making Guides', to: 'https://forums.pokemmo.com/index.php?/topic/106650-in-depth-money-making-guide-multiple-methods-2nd-edition/' },
            { label: 'Catching Breeders', to: 'https://forums.pokemmo.com/index.php?/topic/154142-breed-guide-breeder-catching-engesp/' },
            { label: 'Vanity Index', to: 'https://forums.pokemmo.com/index.php?/topic/145375-pokemmo-vanity-index/' },
        ]
    },
    {
        label: 'Contact Us', to: 'https://discord.gg/ERegmbRSyz',
        icon: 'i-heroicons-bars-3-bottom-right',
    }
] as Link[]

function handleClick(sublink: any) {
    if (sublink.to) {
        if (sublink.to.startsWith('/')) {
            // Internal route
            router.push(sublink.to);
        } else {
            // External link
            window.location.href = sublink.to;
        }
    } else if (sublink.action) {
        sublink.action();
    }
}
</script>



<style scoped>
.button-size {
    padding: 0.5rem 1rem; /* Standard padding */
    min-width: 120px; /* Standard width */
    height: 40px; /* Standard height */
    display: flex;
    align-items: center;
    justify-content: flex-start; /* Align items to start */
    text-align: center;
    overflow: hidden; /* Prevent overflow if necessary */
}


.menu-link {
    display: flex;
    align-items: center;
    white-space: nowrap; /* Prevent text from wrapping */
    text-decoration: none;
    color: inherit;
}

.button-size:hover {
    background-color: rgba(0, 0, 0, 0.1); /* Hover effect */
}

.button-image {
    max-width: 100%; /* Allow image to fill the width */
    max-height: 40px; /* Set a maximum height */
    object-fit: contain; /* Maintain aspect ratio */
}


</style>


<template>
    <div class="flex items-center justify-between">
        <!-- Left Side Links -->
        <div class="flex items-center space-x-4">
            <div v-for="link in leftLinks" :key="link.label" class="flex items-center">
                <NuxtLink v-if="!link.sublinks && link.to.startsWith('/')" :to="link.to"
                    class="menu-link nav-button button-size" exact-active-class="bg-gray-700">
                    <img v-if="link.image" :src="link.image" alt="Elite Four" class="button-image" />
                    <Icon v-else :name="link.icon" class="flex-none w-5 text-gray-400" aria-hidden="true" />
                    {{ link.label }}
                </NuxtLink>

                <!-- External Links -->
                <a v-else-if="!link.sublinks && !link.to.startsWith('/')" :href="link.to" target="_blank"
                    rel="noopener noreferrer" class="menu-link nav-button button-size">
                    <Icon :name="link.icon" class="flex-none w-5 mr-0.5 text-gray-400" aria-hidden="true" />
                    {{ link.label }}
                </a>

                <!-- Popover for Sublinks -->
                <Popover v-else class="relative" as="div">
                    <PopoverButton class="menu-link nav-button button-size flex items-center">
                        <Icon :name="link.icon" class="flex-none w-5 mr-0.5 text-gray-400" aria-hidden="true" />
                        {{ link.label }}
                        <Icon name="heroicons:chevron-down" class="flex-none w-5 mr-0.5 text-gray-400" aria-hidden="true" />
                    </PopoverButton>

                    <transition enter-active-class="transition duration-200 ease-out"
                        enter-from-class="translate-y-1 opacity-0" enter-to-class="translate-y-0 opacity-100"
                        leave-active-class="transition duration-150 ease-in"
                        leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-1 opacity-0">
                        <PopoverPanel class="absolute z-10 w-screen max-w-md overflow-hidden bg-gray-800 shadow-lg rounded-panel top-full">
                            <div class="p-2">
                                <!-- Handle Internal and External Sublinks -->
                                <button v-for="childItem in link.sublinks" :key="childItem.label"
                                    @click="handleClick(childItem)"
                                    class="relative flex p-1 m-1 leading-6 transition duration-150 rounded-panel group gap-x-4 hover:bg-gray-900 button-size">
                                    <div class="items-center justify-center flex-none rounded-button">
                                        <Icon :name="childItem.icon ?? link.icon" class="text-gray-400 items-center text-center" aria-hidden="true" />
                                    </div>
                                    <div class="">
                                        <p class="block font-medium text-white font-display">
                                            {{ childItem.label }}
                                        </p>
                                    </div>
                                </button>
                            </div>
                        </PopoverPanel>
                    </transition>
                </Popover>
            </div>
        </div>

        <!-- Right Side Links -->
        <div class="flex items-center space-x-4">
            <div v-for="link in rightLinks" :key="link.label" class="flex items-center">
                <!-- Internal Links: NuxtLink without target="_blank" -->
                <NuxtLink v-if="!link.sublinks && link.to.startsWith('/')" :to="link.to"
                    class="menu-link nav-button button-size" exact-active-class="bg-gray-700">
                    <Icon :name="link.icon" class="flex-none w-5 mr-0.5 text-gray-400" aria-hidden="true" />
                    {{ link.label }}
                </NuxtLink>

                <!-- External Links -->
                <a v-else-if="!link.sublinks && !link.to.startsWith('/')" :href="link.to" target="_blank"
                    rel="noopener noreferrer" class="menu-link nav-button button-size">
                    <Icon :name="link.icon" class="flex-none w-5 mr-0.5 text-gray-400" aria-hidden="true" />
                    {{ link.label }}
                </a>

                <!-- Popover for Sublinks -->
                <Popover v-else class="relative" as="div">
                    <PopoverButton class="menu-link nav-button button-size flex items-center">
                        <Icon :name="link.icon" class="flex-none w-5 mr-0.5 text-gray-400" aria-hidden="true" />
                        {{ link.label }}
                        <Icon name="heroicons:chevron-down" class="flex-none w-5 mr-0.5 text-gray-400" aria-hidden="true" />
                    </PopoverButton>

                    <transition enter-active-class="transition duration-200 ease-out"
                        enter-from-class="translate-y-1 opacity-0" enter-to-class="translate-y-0 opacity-100"
                        leave-active-class="transition duration-150 ease-in"
                        leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-1 opacity-0">
                        <PopoverPanel class="absolute z-10 w-screen max-w-md overflow-hidden bg-gray-800 shadow-lg rounded-panel top-full">
                            <div class="p-2">
                                <!-- Handle Internal and External Sublinks -->
                                <button v-for="childItem in link.sublinks" :key="childItem.label"
                                    @click="handleClick(childItem)"
                                    class="relative flex p-1 m-1 leading-6 transition duration-150 rounded-panel group gap-x-4 hover:bg-gray-900 button-size">
                                    <div class="items-center justify-center flex-none rounded-button">
                                        <Icon :name="childItem.icon ?? link.icon" class="text-gray-400 items-center text-center" aria-hidden="true" />
                                    </div>
                                    <div class="">
                                        <p class="block font-medium text-white font-display">
                                            {{ childItem.label }}
                                        </p>
                                    </div>
                                </button>
                            </div>
                        </PopoverPanel>
                    </transition>
                </Popover>
            </div>
        </div>
    </div>
</template>

