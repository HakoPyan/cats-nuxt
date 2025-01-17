<template>
  <div class="container mx-auto px-4 py-6">
    <div v-if="catsStore.loading" class="flex justify-center items-center mb-6">
      <div
        class="w-8 h-8 border-4 border-t-4 border-orange-400 border-solid rounded-full animate-spin"
      ></div>
    </div>

    <CatGrid :cats="catsStore.data" v-if="!catsStore.loading" />

    <div class="flex justify-center items-center mt-6 space-x-4">
      <button
        @click="prevPage"
        :disabled="catsStore.currentPage === 1"
        class="px-4 py-2 bg-orange-400 text-white rounded shadow hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>

      <div class="flex items-center space-x-2">
        <span class="text-gray-600">Page {{ catsStore.currentPage }}</span>
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

const catsStore = useCatsStore();

watch(
  () => catsStore.currentPage,
  (newValue) => {
    catsStore.list(newValue);
  },
  {
    immediate: true,
  }
);

function handlePageInput() {
  if (catsStore.currentPage < 1) {
    catsStore.currentPage = 1;
  }
}

function nextPage() {
  catsStore.currentPage += 1;
}

function prevPage() {
  if (catsStore.currentPage > 1) {
    catsStore.currentPage -= 1;
  }
}
</script>
