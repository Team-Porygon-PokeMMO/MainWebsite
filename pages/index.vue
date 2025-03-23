<template>
  <div class="flex flex-col items-center min-h-screen bg-surface-0 dark:bg-surface-900">

    <!-- About Us Section -->
    <div class="mt-16 w-full max-w-4xl">
      <h1 class="text-center">
        <span v-for="(char, index) in splitTitle('About Us')" :key="index"
          :class="index % 2 === 0 ? 'text-blue-500' : 'text-pink-500'">
          {{ char }}
        </span>
      </h1>

      <!-- Accordion Items -->
      <div class="space-y-6 mt-6">
        <AccordionItem title="Who are we?" :leftEmoji="leftImage" :rightEmoji="rightImage">
          Founded July 30th, 2023, Team Porygon is an English-speaking community for those who want to enjoy the PokeMMO PvE experience to the fullest! We believe to build a team, there must be a goal, ours is to enjoy the game as friends in a relaxed, friendly, and highly informative manner.
        </AccordionItem>

        <AccordionItem title="What are our team requirements?" :leftEmoji="leftImage" :rightEmoji="rightImage">
          <li> All regions completed </li>
          <li> 400 in-game hours </li>
          <li> Decent PvE understanding (We'll work with you to help you learn) </li>
          <li> Have a Discord account. We use our team server quite a bit </li>
          <li> Active and friendly </li>
          <li> Active in team chat (Required) </li>
        </AccordionItem>

        <AccordionItem title="Why you should apply" :leftEmoji="leftImage" :rightEmoji="rightImage">
          Our fact-checked information, server structure, and helpful members from around the globe provide an unmatched PvE experience that we believe is second to none. We also host events regularly with prizes funded by charitable donations from our members.
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

    <!-- Team Calendar -->
    <!--<div class="mt-16 w-full max-w-4xl">
      <h1 class="text-center">
        <span v-for="(char, index) in splitTitle('Team Calendar')" :key="index"
          :class="index % 2 === 0 ? 'text-blue-500' : 'text-pink-500'">
          {{ char }}
        </span>
      </h1>

      <div class="flex justify-center mt-6">
        <img 
          src="~/assets/images/NavBar/TeamCal/PorycalendarMAR25.png" 
          alt="Team Calendar" 
          class="w-full max-w-2xl h-auto rounded-lg shadow-lg"
        />
      </div>
    </div> -->
    <div>
        <GeneralCredits />
    </div>
  </div>
</template>

---

### ✅ **Script Section:**
```ts
<script setup lang="ts">
import leftImage from '@/assets/images/NavBar/NavBarIcons/porycrown.png';
import rightImage from '@/assets/images/NavBar/NavBarIcons/porycrownFlipped.png';
import '~/assets/main.css';
import AccordionItem from '~/components/AccordionItem.vue';

// Title split function
const splitTitle = (title: string) => title.split('');
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