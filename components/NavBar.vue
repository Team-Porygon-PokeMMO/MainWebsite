<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { useRouter } from 'vue-router';
import type { RouteLocationRaw } from '#vue-router';
const route = useRoute();

const router = useRouter();
const popover: Ref<any> = ref(null);

// If route changes close the menu
watch(
    () => route.path,
    () => {
        return popover.value?.();
    },
);

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

interface Link {
    label: string;
    to: string;
    icon: string;
    sublinks?: Link[];
}

interface LinkArray {
    isLeft: boolean;
    links: Link[];
}

const links = [
    {
        isLeft: true,
        links: [
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
            }]
    },
    {
        isLeft: false,
        links:
            [{
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
                    { label: 'EV Training and Leveling', to: 'https://forums.pokemmo.com/index.php?/topic/77490-simple-ev-training-leveling-guide-using-horde/' },
                    { label: 'Money Making Guides', to: 'https://forums.pokemmo.com/index.php?/topic/106742-money-guide-community-pickup-guide-2nd-edition/' },
                    { label: 'Catching Breeders', to: 'https://forums.pokemmo.com/index.php?/topic/154142-breed-guide-breeder-catching-engesp/' },
                    { label: 'Vanity Index', to: 'https://forums.pokemmo.com/index.php?/topic/145375-pokemmo-vanity-index/' },
                ]
            },
            {
                label: 'Contact Us', to: 'https://discord.gg/ERegmbRSyz',
                icon: 'i-heroicons-bars-3-bottom-right',
            }
            ]
    }
] as LinkArray[]
</script>

<template>
    <div v-for="linkArray in links"
        class="relative w-full mx-auto space-y-10 md:flex md:items-center md:space-y-0 md:gap-x-10"
        :class="linkArray.isLeft ? 'flex-' : 'flex-none'">
        <div v-for="link in linkArray.links" class="flex flex-auto">
            <NuxtLink v-if="!link.sublinks" :href="link.to" class="menu-link" exact-active-class="bg-gray-700"
                :target="'_blank'">
                <Icon :name="link.icon" class="flex-none w-5 ml-1 text-gray-400" aria-hidden="true" />
                {{ link.label }}
            </NuxtLink>

            <Popover v-else v-slot="{ close }" class="relative" as="div">
                <PopoverButton :ref="() => {
                    popover = close;
                }
                    " class="menu-link">
                    <Icon :name="link.icon" class="flex-none w-5 ml-1 text-gray-400" aria-hidden="true" />
                    {{ link.label }}
                    <Icon name="heroicons:chevron-down" class="flex-none w-5 ml-1 text-gray-400" aria-hidden="true" />
                </PopoverButton>

                <transition enter-active-class="transition duration-200 ease-out"
                    enter-from-class="translate-y-1 opacity-0" enter-to-class="translate-y-0 opacity-100"
                    leave-active-class="transition duration-150 ease-in" leave-from-class="translate-y-0 opacity-100"
                    leave-to-class="translate-y-1 opacity-0">
                    <PopoverPanel
                        class="absolute z-10 w-screen max-w-md overflow-hidden bg-gray-800 shadow-lg rounded-panel top-full">
                        <div class="p-2">
                            <NuxtLink v-for="childItem in link.sublinks" :href="childItem.to" :target="'_blank'"
                                class="relative flex p-1 m-1 leading-6 transition duration-150 rounded-panel group gap-x-4 hover:bg-gray-900">
                                <div class="items-center justify-center flex-none rounded-button">
                                    <Icon :name="link.icon" class="text-gray-400 items-center text-center"
                                        aria-hidden="true" />
                                </div>
                                <div class="">
                                    <p class="block font-medium text-white font-display">
                                        {{ childItem.label }}
                                    </p>
                                </div>
                            </NuxtLink>
                        </div>
                    </PopoverPanel>
                </transition>
            </Popover>
        </div>
    </div>
</template>