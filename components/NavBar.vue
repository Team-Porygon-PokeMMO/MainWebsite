<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Function to handle clicks on dropdown items
function handleClick(sublink: any) {
    console.log('Navigating to:', sublink.to);
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

// Define your links
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
      }
    ]
  },
  {
    isLeft: false,
    links: [
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
] as LinkArray[];
</script>


<style scoped>
.flex-wrap {
    flex-wrap: nowrap; /* Prevent items from wrapping */
}

.menu-link {
    padding: 0.5rem 1rem; /* Adjust spacing around links */
    display: flex;
    align-items: center;
    white-space: nowrap; /* Prevent text from wrapping */
}

.flex.items-center {
    flex: 1;
}
</style>


<template>
    <div class="flex flex-wrap items-center justify-between space-x-4">
        <div v-for="linkArray in links" :key="linkArray.isLeft" class="flex items-center space-x-4">
            <div v-for="link in linkArray.links" :key="link.label" class="flex items-center">
                <!-- Internal Links: NuxtLink without target="_blank" -->
                <NuxtLink
                    v-if="!link.sublinks && link.to.startsWith('/')"
                    :to="link.to"
                    class="menu-link nav-button"
                    exact-active-class="bg-gray-700"
                >
                    <Icon :name="link.icon" class="flex-none w-5 ml-1 text-gray-400" aria-hidden="true" />
                    {{ link.label }}
                </NuxtLink>

                <!-- External Links -->
                <a
                    v-else-if="!link.sublinks && !link.to.startsWith('/')"
                    :href="link.to"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="menu-link nav-button"
                >
                    <Icon :name="link.icon" class="flex-none w-5 ml-1 text-gray-400" aria-hidden="true" />
                    {{ link.label }}
                </a>

                <!-- Popover for Sublinks -->
                <Popover v-else class="relative" as="div">
                    <PopoverButton class="menu-link nav-button flex items-center">
                        <Icon :name="link.icon" class="flex-none w-5 ml-1 text-gray-400" aria-hidden="true" />
                        {{ link.label }}
                        <Icon name="heroicons:chevron-down" class="flex-none w-5 ml-1 text-gray-400" aria-hidden="true" />
                    </PopoverButton>

                    <transition
                        enter-active-class="transition duration-200 ease-out"
                        enter-from-class="translate-y-1 opacity-0"
                        enter-to-class="translate-y-0 opacity-100"
                        leave-active-class="transition duration-150 ease-in"
                        leave-from-class="translate-y-0 opacity-100"
                        leave-to-class="translate-y-1 opacity-0"
                    >
                        <PopoverPanel
                            class="absolute z-10 w-screen max-w-md overflow-hidden bg-gray-800 shadow-lg rounded-panel top-full"
                        >
                            <div class="p-2">
                                <!-- Handle Internal and External Sublinks -->
                                <button
                                    v-for="childItem in link.sublinks"
                                    :key="childItem.label"
                                    @click="handleClick(childItem)"
                                    class="relative flex p-1 m-1 leading-6 transition duration-150 rounded-panel group gap-x-4 hover:bg-gray-900"
                                >
                                    <div class="items-center justify-center flex-none rounded-button">
                                        <Icon :name="link.icon" class="text-gray-400 items-center text-center" aria-hidden="true" />
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




