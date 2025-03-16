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

        <!-- Prize Pool Display
        <div class="mt-4 text-green-600 text-3xl font-mono">
          <h3 class="text-xl text-white">Current Prize Pool:</h3>
          ${{ prizePool.toLocaleString() }}
        </div> -->

  <!-- YouTube Video Link -->
<div class="mt-4">
  <h3 class="text-xl text-white">Shiny Wars: Rules and Prizes</h3>
  <a 
    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" 
    target="_blank" 
    rel="noopener noreferrer" 
    class="text-blue-400 hover:underline"
  >
    Click here to watch
  </a>
</div>
        
      </div>
    </div>

    <img :src="signatureLink" alt="Team Porygon Signature" class="mt-4" />
  </div>
</template>

<script setup lang="ts">
import '~/assets/main.css'
const signatureLink = 'https://i.ibb.co/fq874Kt/Pory-Team-Signature.gif'

const content = [
  {
    title: 'Who are we?',
    description: 'Team Porygon is made up of English-speaking players who want to enjoy the PvE PokeMMO experience! We believe that to build a team, there must be a goal and our goal is to enjoy the game as friends in a relaxed, friendly, and highly informative environment. Our fact-checked information, server structure, and helpful members will provide an unmatched PvE experience that we believe is second to none. Additionally, we have a variety of players from around the world to ensure that we provide you with a community from anywhere, at any time!'
  },
  {
    title: 'Foundation',
    description: 'Recognizing the need for a relaxed yet veteran focused team, Team Porygon [Pory] was founded on 07-30-2023 and is led by its current founder Jaddee. Pory aims to provide a relaxed and friendly while highly informative environment.'
  },
  {
    title: 'Main activities',
    description: 'Team Pory has a focus on maintaining a variety of events for the team, including but not limited to - team shiny bounties, catch events and various pvp events! In addition, Team Pory has members actively developing or contributing to research or guides aiming to provide players with additional knowledge to promote growth in all aspects of the game. Some of these efforts currently include advanced gym run guides, alt speed runs and fossil farming efficiency statistics.'
  },
  {
    title: 'Requirements to join',
    description: 'Team Pory does have a base set of requirements to join, this ensures all members are held to the same standard and treated equally. Team Pory Requirements can be seen below:',
    rules: [
      "All regions completed", "400 in-game hours", "Decent PvE understanding (We'll work with you to help you learn)", "Have a discord account. We use our team server quite a bit", "Active and friendly", "Active in team chat (Required)",
    ]
  },
  {
    title: 'How to apply',
    description: 'To apply to our team, please vist the post below and fill out the required information. Or, reach out directly to @glortwort or @vexious on discord.',
    links: [
      {
        "Url": "https://forums.pokemmo.com/index.php?/topic/159984-openpory-team-porygon-is-recruiting/",
        "Name": "Team Pory Application"
      }
    ]
  }
]
</script>

<style scoped>
img {
  display: inline
}

a {
  color: rgb(51, 40, 211);
  cursor: pointer;
}
</style>

<template>
  <div class="p-1 text-center">
    <h1>Team Porygon (PokeMMO)</h1>
    <div class="grid grid-cols-1 text-justify">
      <div v-for="item in content" class="p-2">
        <h2>{{ item.title }}</h2>
        <h3>{{ item.description }}</h3>
        <div v-if="item.links">
          <a v-for="link in item.links" :href="link.Url" target="_blank">{{ link.Name }}</a>
        </div>
        <ul v-if="item.rules" class="pl-8" style="list-style-type:circle;">
          <li v-for="rule in item.rules">{{ rule }}</li>
        </ul>
      </div>
    </div>
    <img :src="signatureLink" alt="Team Porygon Signature" class="mt-4" />
  </div>
</template>