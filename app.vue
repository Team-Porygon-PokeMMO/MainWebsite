<template>
  <NuxtLoadingIndicator />

  <div class="flex flex-col h-screen justify-between dark">
    <NavBar variant="sticky"/>
    <NuxtPage class="mb-auto w-full dark" />
    <!-- <Footer /> -->
  </div>
  <UNotifications />
</template>

<script lang="ts">
export default {
  created() {
    const colorMode = useColorMode();
    colorMode.preference = 'dark';
    this.storage();
  },
  methods: {
    storage() {
      if (process.client) {
        localStorage.setItem('nuxt-color-mode', 'dark');
      }
      else {
        console.info('Local storage is not available');
      }
    }
  }
};
</script>