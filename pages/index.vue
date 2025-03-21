<template>
  <div class="flex lg:flex-row flex-col min-h-screen bg-surface-0 dark:bg-surface-900">

    <!-- Left Side (About Us Section) -->
    <div class="flex-1 p-1 flex flex-col items-center justify-start"> 
      
      <!-- About Us Title -->
      <h1 class="text-center">
        <span v-for="(char, index) in splitTitle('About Us')" :key="index"
          :class="index % 2 === 0 ? 'text-blue-500' : 'text-pink-500'">
          {{ char }}
        </span>
      </h1>

      <!-- Accordion Items Below Title -->
      <div class="w-full max-w-3xl mt-6">
  <div class="space-y-2">
    <AccordionItem
      title="Who are we?"
      :leftEmoji="leftImage"
      :rightEmoji="rightImage"
    >
      Vue.js is a progressive JavaScript framework for building user interfaces.
    </AccordionItem>
  </div>
</div>
<div class="w-full max-w-3xl mt-6">
  <div class="space-y-2">
    <AccordionItem
      title="How can I join?"
      :leftEmoji="leftImage"
      :rightEmoji="rightImage"
    >
      Vue.js is a progressive JavaScript framework for building user interfaces.
    </AccordionItem>
  </div>
</div>
<div class="w-full max-w-3xl mt-6">
  <div class="space-y-2">
    <AccordionItem
      title="Why is glort a sussy baka?"
      :leftEmoji="leftImage"
      :rightEmoji="rightImage"
    >
      We dont really know. Hes just strange.
    </AccordionItem>
  </div>
</div>

    </div>

    <!-- Right Side (Full-Screen Carousel) -->
    <div class="flex-1 relative w-full lg:w-1/2 h-full">
      <div class="relative w-full h-full overflow-hidden">

        <!-- Carousel Wrapper -->
        <div
          :style="{ transform: 'translateX(' + -100 * currentIndex + '%' }"
          class="flex transition-transform duration-500 ease-in-out h-full"
        >
          <div v-for="(image, index) in images" :key="index" class="flex-shrink-0 w-full h-full">
            <img :src="image.src" :alt="image.alt" class="w-full h-full object-cover" />
          </div>
        </div>

        <!-- Carousel Controls -->
        <button @click="prevSlide" 
          class="absolute top-1/2 left-4 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transform -translate-y-1/2 z-10">
          &#10094;
        </button>
        <button @click="nextSlide" 
          class="absolute top-1/2 right-4 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transform -translate-y-1/2 z-10">
          &#10095;
        </button>

        <!-- Indicators -->
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          <span
            v-for="(image, index) in images"
            :key="index"
            @click="goToSlide(index)"
            :class="[
              'w-3 h-3 rounded-full cursor-pointer',
              currentIndex === index ? 'bg-white' : 'bg-gray-400'
            ]"
          ></span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import leftImage from '@/assets/images/NavBar/NavBarIcons/porycrown.png';
import rightImage from '@/assets/images/NavBar/NavBarIcons/porycrownFlipped.png';
import '~/assets/main.css'
import AccordionItem from '~/components/AccordionItem.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Import images
import GamblinImage from '/images/TeamPics/Gamblin.png'
import HalloweenImage from '/images/TeamPics/Halloween24_4.png'
import TeamPicShinyWar24 from '/images/TeamPics/teampicFinal.png'

const signatureLink = 'https://i.ibb.co/fq874Kt/Pory-Team-Signature.gif'

const content = [
  {
    title: "Team Pory Shiny War:",
    description: "A competitive and social team in PokeMMO!",
    links: [
      { Name: "Official Forum", Url: "https://pokemmo.eu/" },
      { Name: "Discord", Url: "https://discord.gg/example" }
    ],
    rules: [
      "Be respectful to all members.",
      "Follow PokeMMO's rules and guidelines.",
      "No spamming or advertising without permission."
    ]
  }
]

// Title split function
const splitTitle = (title: string) => title.split('')

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

// Prize pool amount
const prizePool = ref(97435719) 
</script>

<style scoped>
img {
  display: inline;
}

a {
  color: rgb(51, 40, 211);
  cursor: pointer;
}
</style>
