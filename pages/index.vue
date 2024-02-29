<script setup lang="ts">
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
</script>

<template>
  <UContainer>
    <!-- <UBreadcrumb divider="/" :links="[{ label: 'Home', to: '/' }]" /> -->
    <h1>Team Porygon [PokeMMO]</h1>
    <img :src="signatureLink" alt="Team Porygon Signature" />
    <div v-for="item in content">
      <h2>{{ item.title }}</h2>
      <h3>{{ item.description }}</h3>
    </div>
  </UContainer>
</template>