<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div
      v-for="cat in cats"
      :key="cat.id"
      class="group relative cursor-pointer"
      @click="goToCat(cat.id)"
    >
      <img
        :src="cat.url"
        :alt="'Cat ' + cat.id"
        class="w-full h-48 object-cover rounded-lg shadow-lg transition-transform transform group-hover:scale-105"
      />

      <div
        class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg"
      >
        <p class="text-white font-bold">View Details</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  cats: {
    type: Array,
    required: true,
  },
});

const router = useRouter();

const goToCat = (id) => {
  router.push(`/cats/${id}`);
};
</script>
