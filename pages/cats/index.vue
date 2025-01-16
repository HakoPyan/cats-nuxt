<template>
  <div class="container mx-auto px-4 py-6">
    <h1 class="text-2xl font-bold mb-6 text-center">All Cats</h1>

    <!-- Loading Indicator -->
    <div v-if="catsStore.loading" class="flex justify-center items-center mb-6">
      <div
        class="w-8 h-8 border-4 border-t-4 border-orange-400 border-solid rounded-full animate-spin"
      ></div>
    </div>

    <CatGrid :cats="catsStore.data" v-if="!catsStore.loading" />

    <div class="flex justify-center items-center mt-6 space-x-4">
      <button
        @click="prevPage"
        :disabled="page === 0"
        class="px-4 py-2 bg-orange-400 text-white rounded shadow hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <!-- Page Input -->
      <div class="flex items-center space-x-2">
        <span class="text-gray-600">Page</span>
        <input
          v-model="pageInput"
          type="number"
          min="1"
          class="w-16 text-center border rounded-md p-1"
          @input="handlePageInput"
        />
      </div>

      <button
        @click="nextPage"
        class="px-4 py-2 bg-orange-400 text-white rounded shadow hover:bg-orange-500"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useCatsStore } from "@/store/cats";

// State to track current page, loading state, and page input value
const page = ref(0);
const loading = ref(false);
const pageInput = ref(1); // User input for page number
const catsStore = useCatsStore();

watch(
  () => catsStore.currentPage,
  (newValue) => {
    catsStore.fetch(newValue);
  },
  {
    immediate: true,
  }
);

function handlePageInput() {
  if (pageInput.value < 1) {
    pageInput.value = 1;
  }
  catsStore.currentPage = pageInput.value - 1;
}

function nextPage() {
  page.value += 1;
  pageInput.value = page.value + 1; // Update input field
  catsStore.currentPage = page.value;
}

function prevPage() {
  if (page.value > 0) {
    page.value -= 1;
    pageInput.value = page.value + 1; // Update input field
    catsStore.currentPage = page.value;
  }
}
</script>
