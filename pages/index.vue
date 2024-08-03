<script lang="ts">
import '~/assets/main.css'
const signatureLink = 'https://i.ibb.co/fq874Kt/Pory-Team-Signature.gif'

const content = [
  {
    title: 'Foundation',
    description: 'We were founded....'
  },
  {
    title: 'Who are we?',
    description: 'We are...'
  },
  {
    title: 'Main activities',
    description: 'Our main activities are...'
  },
  {
    title: 'How to apply',
    description: 'Applying to the team varies depending on the current amount of team members...'
  },
  {
    title: 'Requirements to join',
    description: 'The requirements to join are...'
  }, {
    title: 'Our rules',
    description: 'The rules are...'
  }
]

export default {
  data() {
    return {
      signatureLink,
      content
    }
  },
  head() {
    return {
      title: 'lmao',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Home page description'
        }
      ]
    }
  }
}
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
    <!-- <div v-for="item in content">
      <h2>{{ item.title }}</h2>
      <h3>{{ item.description }}</h3>
    </div> -->
  </div>
</template>