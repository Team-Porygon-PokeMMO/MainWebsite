<script setup lang="ts">
const msg = 'Team Porygon (PokeMMO) WebSite under construction'
const signatureLink = 'https://i.ibb.co/fq874Kt/Pory-Team-Signature.gif'
</script>

<template>
  <UContainer>
    <UBreadcrumb divider="/" :links="[{ label: 'Home', to: '/' }]" />
    <h1>{{ msg }}</h1>
    <img :src="signatureLink" alt="Team Porygon Signature" />
  </UContainer>
</template>