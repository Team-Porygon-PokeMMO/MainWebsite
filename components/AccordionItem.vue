<template>
    <div class="border-b border-zinc-700">
      <button
        @click="toggle"
        class="w-full flex justify-between items-center p-4 bg-zinc-800 text-left text-zinc-100 hover:bg-zinc-700"
      >
        <!-- Left Custom Emoji -->
        <img 
          v-if="leftEmoji" 
          :src="leftEmoji" 
          alt="Left Emoji" 
          class="emoji-icon"
        />
  
        <!-- Title -->
        <span class="flex-grow text-center">{{ title }}</span>
  
        <!-- Right Custom Emoji -->
        <img 
          v-if="rightEmoji" 
          :src="rightEmoji" 
          alt="Right Emoji" 
          class="emoji-icon"
        />
  
        <!-- Arrow Indicator -->
        <span :class="{ 'rotate-180': isOpen }" class="transform transition-transform duration-300">▼</span>
      </button>
  
      <div v-if="isOpen" class="px-4 pb-4 text-zinc-300">
        <slot></slot>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      leftEmoji: {
        type: String,
        default: null,
      },
      rightEmoji: {
        type: String,
        default: null,
      },
      width: {                     // Add width prop
        type: String,
        default: '60%'             // Default to full width
      }
    },
    data() {
      return {
        isOpen: false,
      };
    },
    computed: {
      buttonWidthClass() {
        return `w-[${this.width}]`;  // Dynamic width class
      }
    },
    methods: {
      toggle() {
        this.isOpen = !this.isOpen;
      },
    },
  };
  </script>
  
<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
}

.accordion-enter-to,
.accordion-leave-from {
  max-height: 500px; /* Adjust based on your content's max height */
  opacity: 1;
}

.emoji-icon {
  width: 30px;     /* Set emoji size */
  height: 30px;    /* Keep it consistent */
  object-fit: contain;  
  margin: 0 8px;   /* Spacing around emojis */
}
</style>

            