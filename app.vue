<template>
  <NuxtLoadingIndicator />
  <NavBar variant="sticky" />
  <NuxtPage class="mb-auto w-full dark" />
  <!-- <Footer /> -->
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