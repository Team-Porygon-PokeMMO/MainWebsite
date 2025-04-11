<script setup lang="ts">

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { useRouter, useRoute } from 'vue-router';
import e4Image from '@/assets/images/NavBar/Elite_Four_2.png';
import reRuns from '@/assets/images/NavBar/Reruns_1.png';
import PoryHome from '@/assets/images/NavBar/NavBarIcons/Home_1.png';
import PoryUtility from '@/assets/images/NavBar/NavBarIcons/Utilities_1.png';
import TeamPory from '@/assets/images/NavBar/NavBarIcons/Team_Pory_1.png';
import CommonResources from '@/assets/images/NavBar/NavBarIcons/Resources_1.png';
import ContactUs from '@/assets/images/NavBar/NavBarIcons/Contact_Us_1.png';
import Awards from '@/assets/images/NavBar/NavBarIcons/120x40_AwardsCorners.png';

import { RiFileExcel2Line } from "oh-vue-icons/icons";


import Icon_Clock from '@/assets/images/NavBar/NavBarIcons/Icon_Clock.png';
import Icon_Egg from '@/assets/images/NavBar/NavBarIcons/Icon_Egg.png';
import Icon_Rock from '@/assets/images/NavBar/NavBarIcons/Icon_Rock.png';
import Icon_Money from '@/assets/images/NavBar/NavBarIcons/Icon_Analysis.png';
import Icon_PokeMMO from '@/assets/images/NavBar/NavBarIcons/Icon_PokeMMO.png';
import Icon_Shiny_Showcase from '@/assets/images/NavBar/NavBarIcons/Icon_Shiny_Showcase_2.png';
import Icon_Missing_Shiny_Showcase from '@/assets/images/NavBar/NavBarIcons/Icon_Missing_Shiny_Showcase.png';
import Icon_Pory_Guides from '@/assets/images/NavBar/NavBarIcons/Icon_Pory_Guides.png';
import Icon_Apricorn_Map from '@/assets/images/NavBar/NavBarIcons/Icon_Apricorn_Map.png';
import Icon_Berry from '@/assets/images/NavBar/NavBarIcons/Icon_Berry.png';
import Icon_PokeMMOHub from '@/assets/images/NavBar/NavBarIcons/Icon_PokeMMOHub.png';
import Icon_Happiness from '@/assets/images/NavBar/NavBarIcons/Icon_Happiness.png';
import Icon_Training from '@/assets/images/NavBar/NavBarIcons/Icon_Training.png';
import Icon_Vanity from '@/assets/images/NavBar/NavBarIcons/Icon_Vanity.png';


const router = useRouter();
const route = useRoute();

// Title split function
const splitTitle = (title: string) => title.split('')

import GamblinImage from '/images/TeamPics/Gamblin.png'
import HalloweenImage from '/images/TeamPics/Halloween24_4.png'
import TeamPicShinyWar24 from '/images/TeamPics/teampicFinal.png'
// Carousel data
const currentIndex = ref(0)
const images = [
  { src: GamblinImage, alt: "Image 1" },
  { src: HalloweenImage, alt: "Image 2" },
  { src: TeamPicShinyWar24, alt: "Image 3" }
]

let interval: ReturnType<typeof setInterval> | null = null

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length
}

const prevSlide = () => {
  currentIndex.value = currentIndex.value === 0 ? images.length - 1 : currentIndex.value - 1
}

const goToSlide = (index: number) => {
  currentIndex.value = index
}

const startAutoScroll = () => {
  interval = setInterval(nextSlide, 3000)
}

const stopAutoScroll = () => {
  if (interval) clearInterval(interval)
}

onMounted(startAutoScroll)
onBeforeUnmount(stopAutoScroll)

interface Link {
    action: any;
    label: string,
    to: string,
    icon?: string,
    image?: string;
    sublinks?: Link[]
}
const leftLinks = [
    { to: '/', image: PoryHome },
    { to: '/guides/EliteFour', image: e4Image },
    //{ to: '/guides/Reruns', image: reRuns },
    {
        image: PoryUtility,
        sublinks: [
            { label: 'Current Time', to: '/utilities/DayAndNightCycle', image: Icon_Clock },
            { label: 'Rock Smash Tracker', to: '/utilities/RockSmash', image: Icon_Rock },
           //{ label: 'Egg Cost Analysis', to: '/utilities/EggCostAnalysis', image: Icon_Money } 
            { label: 'Alt Tracker', image: Icon_Pory_Guides, to: 'https://docs.google.com/spreadsheets/d/1Q78Q3T-LuNbtLesCuVsFlKcOdOiY9eoKF9gd02uXnCY/edit?usp=sharing' },
            { label: 'Hatching (Deprecated)', to: '/utilities/HatchCycleTimer', image: Icon_Egg }
        ]
    }
] as Link[];

const rightLinks = [
    {
        image: TeamPory,
        sublinks: [
            { label: 'Forums Club', to: 'https://forums.pokemmo.com/index.php?/clubs/219-pory-porygon/', image: Icon_PokeMMO },
            { label: 'Shiny Showcase', to: 'https://forums.pokemmo.com/index.php?/topic/184615-pory-ot-shiny-showcase/', image: Icon_Shiny_Showcase },
            { label: 'Missing Shiny Dex', to: 'https://forums.pokemmo.com/index.php?/topic/184928-pory-whose-left-to-shunt/', image: Icon_Missing_Shiny_Showcase },
        ]
    },
    {
        image: CommonResources,
        sublinks: [
            { label: 'Pory Guides', to: 'https://forums.pokemmo.com/index.php?/forum/605-poryguides/', image: Icon_Pory_Guides },
            { label: 'Apricorn Map', to: 'https://forums.pokemmo.com/index.php?/topic/160158-johto-apricorn-guide/#comment-2025208', image: Icon_Apricorn_Map },
            { label: 'Berry Farming', to: 'https://www.youtube.com/watch?v=z5BBUKFAvWo&ab_channel=TheClosedBox', image: Icon_Berry },
            { label: 'PokeMMO Hub', to: 'https://pokemmohub.com/', image: Icon_PokeMMOHub },
            { label: 'Happiness Using Berries', to: 'https://forums.pokemmo.com/index.php?/topic/154921-guide-raising-happiness-using-berries/', image: Icon_Happiness },
            { label: 'EV Training and Leveling', to: 'https://forums.pokemmo.com/index.php?/topic/77490-simple-ev-training-leveling-guide-using-horde/#comment-1515139', image: Icon_Training },
            { label: 'Money Making Guides', to: 'https://forums.pokemmo.com/index.php?/topic/106650-in-depth-money-making-guide-multiple-methods-2nd-edition/', image: Icon_Money },
            { label: 'Vanity Index', to: 'https://forums.pokemmo.com/index.php?/topic/145375-pokemmo-vanity-index/', image: Icon_Vanity },
        ]
    },
    { image: ContactUs, to: 'https://discord.gg/ERegmbRSyz' }
] as Link[];

function handleClick(sublink: Link) {
    if (sublink.to) {
        if (sublink.to.startsWith('/')) {
            router.push(sublink.to);
        } else {
            window.location.href = sublink.to;
        }
    }
}

const content = ref([
    {
        title: "Team Porygon Event",
        description: "Join us for an exciting event with incredible rewards!"
    }
]);

const isHomePage = computed(() => route.path === '/');

const prizePool = ref(214755936);  // Initial prize pool value
</script>


<template>
    <div class="page-container">
  
      <!-- Navigation Bar -->
      <div class="nav-container">
        <div class="flex justify-between items-center">
  
          <!-- Left Navigation Links -->
          <div class="flex items-center space-x-0">
            <div v-for="link in leftLinks" :key="link.label || link.to" class="flex items-center">
              
              <!-- Internal Links -->
              <NuxtLink v-if="!link.sublinks && link.to.startsWith('/')" :to="link.to"
                        class="menu-link nav-button button-size" exact-active-class="bg-gray-700">
                <img v-if="link.image" :src="link.image" alt="Nav Image" class="button-image" />
                <span>{{ link.label }}</span>
              </NuxtLink>
  
              <!-- External Links -->
              <a v-else-if="!link.sublinks && !link.to.startsWith('/')" :href="link.to" target="_blank"
                 rel="noopener noreferrer" class="menu-link nav-button button-size">
                <span>{{ link.label }}</span>
              </a>
  
              <!-- Left Sublinks -->
              <Popover v-else class="relative" as="div">
                <PopoverButton class="menu-link nav-button button-size flex items-center">
                  <img v-if="link.image" :src="link.image" alt="Parent Image" class="button-image" />
                  <span>{{ link.label }}</span>
                </PopoverButton>
  
                <transition enter-active-class="transition duration-200 ease-out"
                            enter-from-class="translate-y-1 opacity-0" enter-to-class="translate-y-0 opacity-100"
                            leave-active-class="transition duration-150 ease-in"
                            leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-1 opacity-0">
                  <PopoverPanel class="absolute z-10 w-screen max-w-md overflow-hidden bg-gray-800 shadow-lg rounded-panel top-full">
                    <div class="p-2">
                      <button v-for="childItem in link.sublinks" :key="childItem.label"
                              @click="childItem.action ? childItem.action() : handleClick(childItem)"
                              class="relative flex p-1 m-1 leading-6 transition duration-150 rounded-panel group gap-x-4 hover:bg-gray-900 button-size">
                        <div class="items-center justify-center flex-none rounded-button">
                          <img v-if="childItem.image" :src="childItem.image" alt="Sublink Image" class="button-image" />
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
  
          <!-- Right Navigation Links -->
          <div class="flex items-center space-x-0">
  
            <div v-for="link in rightLinks" :key="link.label" class="flex items-center">
              
              <!-- Right External/Internal Links -->
              <NuxtLink v-if="!link.sublinks && link.to.startsWith('/')" :to="link.to"
                        class="menu-link nav-button button-size" exact-active-class="bg-gray-700">
                <img v-if="link.image" :src="link.image" alt="Right Link Image" class="button-image" />
                {{ link.label }}
              </NuxtLink>
  
              <a v-else-if="!link.sublinks && !link.to.startsWith('/')" :href="link.to" target="_blank"
                 rel="noopener noreferrer" class="menu-link nav-button button-size">
                <img v-if="link.image" :src="link.image" alt="Right Link Image" class="button-image" />
                {{ link.label }}
              </a>
  
              <!-- Right Sublinks -->
              <Popover v-else class="relative" as="div">
                <PopoverButton class="menu-link nav-button button-size flex items-center">
                  <img v-if="link.image" :src="link.image" alt="Right Link Image" class="button-image" />
                  <span>{{ link.label }}</span>
                </PopoverButton>
  
                <transition enter-active-class="transition duration-200 ease-out"
                            enter-from-class="translate-y-1 opacity-0" enter-to-class="translate-y-0 opacity-100"
                            leave-active-class="transition duration-150 ease-in"
                            leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-1 opacity-0">
                  <PopoverPanel class="absolute z-10 w-screen max-w-md overflow-hidden bg-gray-800 shadow-lg rounded-panel top-full">
                    <div class="p-2">
                      <button v-for="childItem in link.sublinks" :key="childItem.label"
                              @click="childItem.action ? childItem.action() : handleClick(childItem)"
                              class="relative flex p-1 m-1 leading-6 transition duration-150 rounded-panel group gap-x-4 hover:bg-gray-900 button-size">
                        <div class="items-center justify-center flex-none rounded-button">
                          <img v-if="childItem.image" :src="childItem.image" alt="Sublink Image" class="button-image" />
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
      </div>
    

      <template v-if="isHomePage">
      <div class="flex justify-center mt-2">
        <h1 class="text-center">
        <span v-for="(char, index) in splitTitle('Team Porygon')" :key="index"
          :class="index % 2 === 0 ? 'text-blue-500' : 'text-pink-500'">
          {{ char }}
        </span>
      </h1>
      </div>
  
      <!-- Carousel Section -->
        <!-- Commented out for Shiny War-->
       <!--
      <div class="carousel-wrapper">
        <div class="carousel-track" :style="{ transform: `translateX(-${100 * currentIndex}%)` }">
          <div v-for="(image, index) in images" :key="index" class="carousel-slide">
            <img :src="image.src" :alt="image.alt" class="carousel-image" />
          </div>
        </div>
  
        <button @click="prevSlide" class="carousel-control left">&#10094;</button>
        <button @click="nextSlide" class="carousel-control right">&#10095;</button>
      </div>
  -->
  <div class="flex justify-center mt-4">
  <iframe 
    width="1000" 
    height="562" 
    src="https://www.youtube.com/embed/jXOSxHiTC3w?rel=0&modestbranding=1&autoplay=0&controls=1" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</div>
      <!-- Event Section -->
      <div class="flex justify-center mt-2">
        <h1 class="text-center">
        <span v-for="(char, index) in splitTitle('Shiny Wars in:')" :key="index"
          :class="index % 2 === 0 ? 'text-blue-500' : 'text-pink-500'">
          {{ char }}
        </span>
      </h1>
    </div>
  
    
<div class="countdown-container">
    <client-only>
        <vue3-flip-countdown deadline="2025-04-17 22:00:00" />
    </client-only>
</div>

<!-- Centered Prize Pool Display -->
<div class="flex justify-center items-center mt-4">
    <div class="text-green-600 text-3xl font-mono text-center">
        <h3 class="text-xl text-white">Current Prize Pool:</h3>
        ${{ prizePool.toLocaleString() }}
    </div>
      </div>
    </template>
</div>
</template>
  

<style scoped>
/* Existing Navigation Styles */
.button-size {
    padding: 0.0rem 0rem;
    min-width: 120px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    text-align: center;
    overflow: hidden;
}

.menu-link {
    display: flex;
    align-items: center;
    white-space: nowrap;
    text-decoration: none;
    color: inherit;
}

.button-size:hover {
    background-color: rgba(0, 0, 0, 0.1);
}

.button-image {
    max-width: 100%;
    max-height: 40px;
    object-fit: cover;
}

/* Flex container for left and right content below nav bar */
.content-container {
    display: flex;
    height: calc(100vh - 60px); /* Adjust based on navbar height */
    margin-top: 1rem;
}

.left-side {
    flex: 1;
    padding: 1rem;
    background-color: #f0f0f0;
    overflow-y: auto;
}

.right-side {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background-color: #ffffff;
    overflow-y: auto;
}

/* Centered GIF */
.gif-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px; /* Ensures space around the GIF */
  
}

.gif-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  height: auto;
}

.gif-class {
  max-width: 20%;       /* Scale GIF size */
  max-width: 800px;
  height: 300px;       
  object-fit: contain;
}

/* 🌟 Carousel Container */
.carousel-wrapper {
  width: 100%;
  max-width: 1200px;               /* Max width */
  height: 600px;                    /* Fixed height */
  position: relative;
  margin: 0 auto;                   /* Center horizontally */
  display: flex;
  align-items: center;              /* Center vertically */
  justify-content: center;          /* Center horizontally */
  overflow: hidden;                 /* No overflow */
  background: transparent;          /* ✅ Remove black background */
}

/* 🎯 Carousel Track */
.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
  height: 100%;
}

/* ✅ Carousel Slides */
.carousel-slide {
  min-width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;           /* Consistent sizing */
  overflow: hidden;                 /* Prevent overflow */
  background: transparent;          /* ✅ Remove black background */
}

/* 🌟 Carousel Images */
.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: contain;              /* Show the full image without cropping */
  display: block;
  background: transparent;          /* ✅ Ensure image background is transparent */
}

/* 🚀 Improved Arrow Styles */
.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  padding: 15px;
  cursor: pointer;
  z-index: 10;
  font-size: 24px;
  transition: background 0.3s ease;
}

/* ✅ Move arrows slightly outside */
.carousel-control.left {
  left: 15px;
}

.carousel-control.right {
  right: 15px;
}

/* Add hover effect */
.carousel-control:hover {
  background: rgba(0, 0, 0, 0.9);
}


/* Event Section */
.event-section {
  text-align: center;
  margin: 40px 0;
}

.event-title {
  font-size: 2rem;
  color: #3498db;
}

.countdown-container {
  margin: 30px 0;
}

.prize-pool {
  margin-top: 20px;
  color: #00e676;
  font-size: 2rem;
}
</style>
  