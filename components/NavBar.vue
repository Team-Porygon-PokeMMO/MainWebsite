<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { useRouter } from 'vue-router';
import e4Image from '@/assets/images/NavBar/e4120x40corner.png';
import PoryHome from '@/assets/images/NavBar/120x40_PoryHomeCorners.png';
import PoryUtility from '@/assets/images/NavBar/120x40_UtilitiesCornersWithArrow.png';
import TeamPory from '@/assets/images/NavBar/120x40_Team_PoryCornersWithArrow.png';
import CommonResources from '@/assets/images/NavBar/120x40_ResourcesCornersWithArrow.png';
import ContactUs from '@/assets/images/NavBar/120x40_Contact_UsCorners.png';
import Icon_Apricorn_Map from '@/assets/images/NavBar/NavBarIcons/Icon_Apricorn_Map.png';
import Icon_Berry from '@/assets/images/NavBar/NavBarIcons/Icon_Berry.png';
import Icon_Clock from '@/assets/images/NavBar/NavBarIcons/Icon_Clock.png';
import Icon_Egg from '@/assets/images/NavBar/NavBarIcons/Icon_Egg.png';
import Icon_Missing_Shiny_Showcase from '@/assets/images/NavBar/NavBarIcons/Icon_Missing_Shiny_Showcase.png';
import Icon_Money from '@/assets/images/NavBar/NavBarIcons/Icon_Money.png';
import Icon_PokeMMO from '@/assets/images/NavBar/NavBarIcons/Icon_PokeMMO.png';
import Icon_PokeMMOHub from '@/assets/images/NavBar/NavBarIcons/Icon_PokeMMOHub.png';
import Icon_Pory_Guides from '@/assets/images/NavBar/NavBarIcons/Icon_Pory_Guides.png';
import Icon_Rock from '@/assets/images/NavBar/NavBarIcons/Icon_Rock.png';
import Icon_Shiny_Showcase from '@/assets/images/NavBar/NavBarIcons/Icon_Shiny_Showcase.png';
import Icon_Training from '@/assets/images/NavBar/NavBarIcons/Icon_Training.png';
import Icon_Vanity from '@/assets/images/NavBar/NavBarIcons/Icon_Vanity.png';
import Icon_Happiness from '@/assets/images/NavBar/NavBarIcons/Icon_Happiness.png';

const router = useRouter();

interface Link {
    label: string,
    to: string,
    icon: string,
    image?: string;
    sublinks?: Link[]
}

const leftLinks = [
    {
        to: '/',
        image: PoryHome,
    },
    {
        to: '/guides/EliteFour',
        image: e4Image,
    },
    {

      
        image: PoryUtility,
        sublinks: [
            {
                label: 'Current Time',
                to: '/utilities/DayAndNightCycle',
                image: Icon_Clock,
            },
            {
                label: 'Hatching',
                to: '/utilities/HatchCycleTimer',
                image: Icon_Egg,
            },
            {
                label: 'Rock Smash Tracker',
                to: '/utilities/RockSmash',
                image: Icon_Rock,
            },
            {
                label: 'Egg Cost Analysis',
                to: '/utilities/EggCostAnalysis',
               // icon: Icon_Money,
            }
        ]
    }
] as Link[]

const rightLinks = [
    {
        image: TeamPory,
        sublinks: [ 
            { label: 'Forums Club', to: 'https://forums.pokemmo.com/index.php?/clubs/219-pory-porygon/', image: Icon_PokeMMO },
            { label: 'Shiny Showcase', to: 'https://forums.pokemmo.com/index.php?/topic/159659-pory-ot-shiny-showcase/', image: Icon_Shiny_Showcase },
            { label: 'Missing Shiny Dex', to: 'https://forums.pokemmo.com/index.php?/topic/159671-pory-whose-left-to-shunt/', image: Icon_Missing_Shiny_Showcase },
        ]
    },
    {
        image: CommonResources,
        sublinks: [
            { label: 'Pory Guides', to: 'https://forums.pokemmo.com/index.php?/forum/605-poryguides/', image: Icon_Pory_Guides },
            { label: 'Apricorn Map', to: 'https://forums.pokemmo.com/index.php?/topic/160158-johto-apricorn-guide/#comment-2025208', image: Icon_Apricorn_Map },
            { label: 'Berry Farming', to: 'https://www.youtube.com/watch?v=z5BBUKFAvWo&ab_channel=TheClosedBox', image: Icon_Berry},
            { label: 'PokeMMO Hub', to: 'https://pokemmohub.com/', image: Icon_PokeMMOHub },
            { label: 'Happiness Using Berries', to: 'https://forums.pokemmo.com/index.php?/topic/154921-guide-raising-happiness-using-berries/', image: Icon_Happiness },
            { label: 'EV Training and Leveling', to: 'https://forums.pokemmo.com/index.php?/topic/77490-simple-ev-training-leveling-guide-using-horde/#comment-1515139', image: Icon_Training },
            { label: 'Money Making Guides', to: 'https://forums.pokemmo.com/index.php?/topic/106650-in-depth-money-making-guide-multiple-methods-2nd-edition/', image: Icon_Money },
           // { label: 'Catching Breeders', to: 'https://forums.pokemmo.com/index.php?/topic/154142-breed-guide-breeder-catching-engesp/', image: 'i-heroicons-newspaper' },
            { label: 'Vanity Index', to: 'https://forums.pokemmo.com/index.php?/topic/145375-pokemmo-vanity-index/', image: Icon_Vanity },
        ]
    },
    {
        image: ContactUs,
        to: 'https://discord.gg/ERegmbRSyz',
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
    padding: 0.0rem 0rem; /* Standard padding */
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
    object-fit: cover; /* Maintain aspect ratio */
}


</style>


<template>
    <div class="flex items-center justify-between">
        <!-- Left Side Links -->
        <div class="flex items-center space-x-0">
            <div v-for="link in leftLinks" :key="link.label || link.to" class="flex items-center">
    <NuxtLink v-if="!link.sublinks && link.to.startsWith('/')" :to="link.to"
        class="menu-link nav-button button-size" exact-active-class="bg-gray-700">
        <img v-if="link.image" :src="link.image" alt="Elite Four" class="button-image" />
        <Icon v-else :name="link.icon" class="flex-none w-5 text-gray-400" aria-hidden="true" />
        <span v-if="link.label">{{ link.label }}</span> <!-- Render only if label exists -->
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
        <!-- Check if parent link has an image -->
        <img v-if="link.image" :src="link.image" alt="Parent Image" class="button-image" />
        <Icon v-else :name="link.icon" class="flex-none w-5 mr-0.5 text-gray-400" aria-hidden="true" />
        {{ link.label }}
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
                    
                    <!-- Check if childItem has image -->
                    <div class="items-center justify-center flex-none rounded-button">
                        <img v-if="childItem.image" :src="childItem.image" alt="Sublink Image" class="button-image" />
                        <Icon v-else :name="childItem.icon ?? link.icon" class="text-gray-400 items-center text-center" aria-hidden="true" />
                    </div>
                    
                    <div>
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
<div class="flex items-center space-x-0">
    <div v-for="link in rightLinks" :key="link.label" class="flex items-center">
        <!-- Internal Links: NuxtLink without target="_blank" -->
        <NuxtLink v-if="!link.sublinks && link.to.startsWith('/')" :to="link.to"
            class="menu-link nav-button button-size" exact-active-class="bg-gray-700">
            <!-- Check if parent link has an image -->
            <img v-if="link.image" :src="link.image" alt="Right Link Image" class="button-image" />
            <Icon v-else :name="link.icon" class="flex-none w-5 mr-0.5 text-gray-400" aria-hidden="true" />
            {{ link.label }}
        </NuxtLink>

        <!-- External Links -->
        <a v-else-if="!link.sublinks && !link.to.startsWith('/')" :href="link.to" target="_blank"
            rel="noopener noreferrer" class="menu-link nav-button button-size">
            <img v-if="link.image" :src="link.image" alt="Right Link Image" class="button-image" />
            <Icon v-else :name="link.icon" class="flex-none w-5 mr-0.5 text-gray-400" aria-hidden="true" />
            {{ link.label }}
        </a>

        <!-- Popover for Sublinks -->
<Popover v-else class="relative" as="div">
    <PopoverButton class="menu-link nav-button button-size flex items-center">
        <!-- Check if parent link has an image -->
        <img v-if="link.image" :src="link.image" alt="Right Link Image" class="button-image" />
        <Icon v-else :name="link.icon" class="flex-none w-5 mr-0.5 text-gray-400" aria-hidden="true" />
        {{ link.label }}
        
        <!-- Only show arrow if there's no image -->
        <Icon v-if="!link.image" name="heroicons:chevron-down" class="flex-none w-5 mr-0.5 text-gray-400" aria-hidden="true" />
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
                    
                    <!-- Check if childItem has image -->
                    <div class="items-center justify-center flex-none rounded-button">
                        <img v-if="childItem.image" :src="childItem.image" alt="Sublink Image" class="button-image" />
                        <Icon v-else :name="childItem.icon ?? link.icon" class="text-gray-400 items-center text-center" aria-hidden="true" />
                    </div>
                    
                    <div>
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