<template>
  <NuxtLoadingIndicator />

  <div class="flex flex-col h-screen justify-between">
    <NavBar variant="sticky" />
    <NuxtPage class="mb-auto w-full" />
    <Footer />
  </div>
  <UNotifications />
</template>