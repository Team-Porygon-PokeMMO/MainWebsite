<script setup lang="ts">
import '~/assets/main.css'
const signatureLink = 'https://i.ibb.co/fq874Kt/Pory-Team-Signature.gif'

const content = [
  {
    title: 'Foundation',
    description: 'Recognizing the need for a relaxed yet veteran focused team, Team Porygon [Pory] was founded on 07-30-2023 by Jaddee, Sythus, and DragoTamer. Pory aims to provide a relaxed and friendly while highly informative environment.'
  },
  {
    title: 'Who are we?',
    description: 'Team Porygon is made up of English-speaking players who want to enjoy the PvE PokeMMO experience! We believe that to build a team, there must be a goal and our goal is to enjoy the game as friends in a relaxed, friendly, and highly informative environment. Our fact-checked information, server structure, and helpful members will provide an unmatched PvE experience that we believe is second to none. Additionally, we have a variety of players from around the world to ensure that we provide you with a community from anywhere, at any time!'
  },
  {
    title: 'Main activities',
    description: 'Team Pory has a focus on maintaining a variety of events for the team, including but not limited to - team shiny bounties, catch events and various pvp events! In addition, Team Pory has members actively developing or contributing to research or guides aiming to provide players with additional knoweldge to promote growth in all aspects of the game. Some of these efforts currently include advanced gym run guides, alt speed runs and fossil farming efficiency statistics.'
  },
  {
    title: 'Requirements to join',
    description: 'Team Pory does have a base set of requirements to join, this ensures all members are held to the same standard and treated equally. Team Pory Requirements can be seen below: ENTER RULES(Prerequisites) FROM https://forums.pokemmo.com/index.php?/topic/159984-openpory-team-porygon-is-recruiting/'
  },
  {
    title: 'How to apply',
    description: 'To apply to our team, please vist the post below and fill out the required information. Or, reach out directly to glortwort or vexious on discord.',
    "Team Pory Application": [
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
</style>

<template>
  <div class="text-center p-4">
    <h1>Team Porygon Site (PokeMMO)</h1>
    <img :src="signatureLink" alt="Team Porygon Signature" class="text-center" />
    <div v-for="item in content">
      <h2>{{ item.title }}</h2>
      <h3>{{ item.description }}</h3>
    </div>
  </div>
</template>