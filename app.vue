<template>
  <NuxtLoadingIndicator />
  <NavBar variant="sticky" />
  <NuxtPage class="mb-auto w-full dark" />
  <!-- <Footer /> -->
  <UNotifications />

  <div class="m-4">
    <b class="cursor-pointer" @click="toggleTheme()">{{ getThemeToggle }}</b>
  </div>
</template>

<script lang="ts">
export default {
  created() {
    const colorMode = useColorMode();
    let themePreference = 'dark';
    if (process.client) {
      let savedThemePreference = localStorage?.getItem('colorMode');
      if (savedThemePreference) {
        themePreference = savedThemePreference;
      } else {
        themePreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
    }
    colorMode.preference = themePreference
  },
  computed: {
    getThemeToggle() {
      const colorMode = useColorMode();
      return colorMode.preference === 'dark' ? 'Light Mode' : 'Dark Mode';
    }
  },
   methods: {
    toggleTheme() {
      const colorMode = useColorMode();
      colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark';
      localStorage?.setItem('colorMode', colorMode.preference);
    }
  }
};
</script>