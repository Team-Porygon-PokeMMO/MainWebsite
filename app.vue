<template>
  <NuxtLoadingIndicator />

  <div class="flex flex-col h-screen justify-between dark">
    <NavBar variant="sticky" class="dark" />
    <NuxtPage class="mb-auto w-full class" />
    <!-- <Footer /> -->
  </div>
  <UNotifications />
</template>

<script lang="ts">
export default {
  created() {
    this.storage();
    const colorMode = useColorMode();
    colorMode.preference = 'dark';
  },
  methods: {
    storage() {
      if (process.browser) {
        localStorage.setItem('nuxt-color-mode', 'dark');
      }
    }
  }
};
</script>