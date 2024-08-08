<template>
  <NuxtLoadingIndicator />

  <div class="flex flex-col h-screen justify-between dark">
    <NavBar variant="sticky" class="dark" />
    <NuxtPage class="mb-auto w-full class" />
    <!-- <Footer /> -->
  </div>
  <UNotifications />
</template>

<script setup>
const colorMode = useColorMode();
colorMode.preference = 'dark';
</script>