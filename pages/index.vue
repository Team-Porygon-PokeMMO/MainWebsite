<template>
  <div class="flex lg:flex-row flex-col min-h-screen bg-surface-0 dark:bg-surface-900">

    <!-- Left Side (About Us Section) -->
    <div class="flex-1 p-1 flex flex-col items-center justify-start"> 

     <!-- Team Calendar -->
<h1 class="text-center">
  <span v-for="(char, index) in splitTitle('Team Calendar')" :key="index"
    :class="index % 2 === 0 ? 'text-blue-500' : 'text-pink-500'">
    {{ char }}
  </span>
</h1>

<!-- Image below the title -->
<div class="flex justify-center mt-4">
  <img 
    src="~/assets/images/NavBar/TeamCal/PorycalendarMAR25.png" 
    alt="Team Calendar" 
    class="w-full max-w-2xl h-auto rounded-lg shadow-lg"
  />
</div>

      
      <!-- About Us Title -->
      <h1 class="text-center">
        <span v-for="(char, index) in splitTitle('About Us')" :key="index"
          :class="index % 2 === 0 ? 'text-blue-500' : 'text-pink-500'">
          {{ char }}
        </span>
      </h1>

      <!-- Accordion Items Below Title -->
      <div class="w-full max-w-2xl mt-6">
  <div class="space-y-2">
    <AccordionItem
      title="Who are we?"
      :leftEmoji="leftImage"
      :rightEmoji="rightImage"
    >
    Founded July 30th, 2023, Team Porygon is an English-speaking community for those who want to enjoy the PokeMMO PvE experience to the fullest! We believe to build a team, there must be a goal, ours is to enjoy the game as friends in a relaxed, friendly, and highly informative manner.
    </AccordionItem>
  </div>
</div>

<div class="w-full max-w-2xl mt-6">
  <div class="space-y-2">
    <AccordionItem
      title="What are our team requirements?"
      :leftEmoji="leftImage"
      :rightEmoji="rightImage"
    >
    <li> All regions completed </li>
    <li> 400 in-game hours </li>
    <li> Decent PvE understanding (We'll work with you to help you learn) </li>
    <li>¥ Have a discord account. We use our team server quite a bit </li>
    <li> Active and friendly </li>
    <li> Active in team chat (Required) </li>
    </AccordionItem>
  </div>
</div>

<div class="w-full max-w-2xl mt-6">
  <div class="space-y-2">
    <AccordionItem
      title="Why you should apply"
      :leftEmoji="leftImage"
      :rightEmoji="rightImage"
    >
      Our fact-checked information, server structure, and helpful members from around the globe provide an unmatched PvE experience that we believe is second to none. We also host events regularly with prizes that are funded by charitable donations from our members, our events are posted on the forums on our club page for anyone interested.
      <br />
      <a 
        href="https://forums.pokemmo.com/index.php?/topic/159984-openpory-team-porygon-is-recruiting/#comment-2023997" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="text-blue-500 hover:underline"
      >
        View our recruitment page
      </a>
    </AccordionItem>
  </div>
</div>

    </div>

    <!-- Right Side (Full-Screen Carousel) -->
    <div class="flex-1 relative w-full lg:w-1/2 h-full">
      <div class="relative w-full h-full overflow-hidden">

       <!-- Team Scrapbook -->
<h1 class="text-center">
  <span v-for="(char, index) in splitTitle('Team Scrapbook')" :key="index"
    :class="index % 2 === 0 ? 'text-blue-500' : 'text-pink-500'">
    {{ char }}
  </span>
</h1>

<!-- Carousel Wrapper (Same size as Calendar) -->
<div class="relative w-full max-w-4xl mx-auto mt-6 overflow-hidden rounded-2xl shadow-xl bg-transparent">
  <div
    :style="{ transform: 'translateX(' + -100 * currentIndex + '%' }"
    class="flex transition-transform duration-500 ease-in-out"
    style="width: 100%"
  >
    <!-- Proper Vue Syntax for Loop -->
    <template v-for="(image, index) in images" :key="index">
      <div 
        class="flex-shrink-0 w-full h-[720px] flex justify-center items-center overflow-hidden bg-transparent"
        style="border: none; outline: none;"
      >
        <img 
          :src="image.src" 
          :alt="image.alt" 
          class="max-w-[90%] h-auto object-contain rounded-2xl"
        />
      </div>
    </template>
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
