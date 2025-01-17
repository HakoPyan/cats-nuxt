<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center"
  >
    <img
      src="https://cdn2.thecatapi.com/images/2dl.jpg"
      alt="Funny Cat"
      class="w-64 h-64 rounded-full shadow-lg mb-6"
    />

    <h1 class="text-4xl font-bold text-orange-500 mb-4">Meow-rror! 🐾</h1>
    <p class="text-lg text-gray-700">
      Oops! Something went wrong, and we couldn't find the page you were looking
      for.
    </p>
    <p
      v-if="error?.statusMessage"
      class="text-lg text-red-500 font-semibold mb-4"
    >
      {{ error.statusMessage }}
    </p>
    <p class="text-lg text-gray-700 mb-6">
      Don't worry, our cats are chasing the error. Please try again!
    </p>

    <button
      @click="goHome"
      class="px-6 py-3 bg-orange-400 text-white rounded shadow hover:bg-orange-500"
    >
      Take Me Home 🏠
    </button>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const props = defineProps({
  error: Object,
});

function goHome() {
  router.push("/");
}
</script>
