<template>
  <div class="flex flex-col items-center justify-center">
    <div v-if="!catsStore.loading" class="mb-4">
      <img
        :src="catsStore.randomCat?.url"
        :alt="'Random cat image'"
        class="w-64 h-64 object-cover rounded-lg shadow-md"
      />
    </div>
    <div v-else class="mb-4">
      <p class="text-gray-500">Loading...</p>
    </div>

    <nuxt-link
      to="cats"
      class="px-6 py-3 bg-orange-400 text-white rounded-lg shadow hover:bg-orange-500 transition-colors"
    >
      Check all the cats
    </nuxt-link>
  </div>
</template>

<script setup>
import { useCatsStore } from "@/store/cats";
const catsStore = useCatsStore();
catsStore.fetchRandomCat();
</script>
