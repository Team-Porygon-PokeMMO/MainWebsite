<template>
  <div class="p-1 text-center">
    <h1>
      <span v-for="(char, index) in splitTitle('Team Porygon')" :key="index"
        :class="index % 2 === 0 ? 'text-blue-500' : 'text-pink-500'">
        {{ char }}
      </span>
    </h1>

    <!-- Carousel Section -->
    <div class="flex justify-center items-center py-6">
      <div class="relative w-full max-w-3xl overflow-hidden">
        <div
          :style="{ transform: 'translateX(' + -100 * currentIndex + '%' }"
          class="flex transition-transform duration-500 ease-in-out"
        >
          <div v-for="(image, index) in images" :key="index" class="flex-shrink-0 w-full">
            <img :src="image.src" :alt="image.alt" class="w-full h-96 object-contain" />
          </div>
        </div>

        <!-- Carousel Controls -->
        <button @click="prevSlide" class="absolute top-1/2 left-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transform -translate-y-1/2">
          &#10094;
        </button>
        <button @click="nextSlide" class="absolute top-1/2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transform -translate-y-1/2">
          &#10095;
        </button>

        <!-- Indicators -->
        <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
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

    <!-- Team Content -->
    <div v-for="(item, index) in content" :key="index" class="p-2">
      <h2 class="text-xl font-bold">{{ item.title }}</h2>

      <!-- Show countdown timer & prize pool only for "Team Pory Shiny War" -->
      <div v-if="index === 0">
        <client-only>
          <vue3-flip-countdown deadline="2025-04-17 22:00:00" />
        </client-only>

        <!-- Prize Pool Display -->
        <div class="mt-4 text-green-600 text-3xl font-mono">
          <h3 class="text-xl text-white">Current Prize Pool:</h3>
          ${{ prizePool.toLocaleString() }}
        </div>
      </div>
    </div>

    <img :src="signatureLink" alt="Team Porygon Signature" class="mt-4" />
  </div>
</template>

<script setup lang="ts">
import '~/assets/main.css'
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Import local images properly
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

// Function to split the title into characters
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

// Static prize pool amount
const prizePool = ref(82095713) // Set a fixed number for the prize pool
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
