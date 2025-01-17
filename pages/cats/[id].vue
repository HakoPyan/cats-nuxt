<template>
  <div class="container mx-auto px-4 py-6">
    <div class="flex items-center mb-4">
      <button
        @click="goBack"
        class="px-4 py-2 bg-orange-400 text-white rounded shadow hover:bg-orange-500 mr-4"
      >
        Back
      </button>
    </div>

    <div v-if="catsStore.selectedCat" class="flex flex-col items-center">
      <img
        :src="catsStore.selectedCat.url"
        alt="Cat"
        class="w-64 h-64 object-cover rounded-lg shadow-lg mb-4"
      />

      <p class="text-lg font-semibold">
        Breed: {{ catsStore.selectedCat.breeds?.[0]?.name || "Unknown" }}
      </p>
      <p class="text-gray-600">
        Weight:
        {{ catsStore.selectedCat.breeds?.[0]?.weight?.metric || "N/A" }} kg
      </p>
      <p class="text-gray-600">
        Child Friendly:
        {{ catsStore.selectedCat.breeds?.[0]?.child_friendly || "Unknown" }}
      </p>
    </div>

    <div v-else class="flex items-center">Loading...</div>

    <div class="flex flex-col items-center mt-4">
      <div v-if="!catsStore.loading">
        <CatGrid
          v-if="catsStore.sameBreedCats.length"
          :cats="catsStore.sameBreedCats"
          :grid="3"
        />
        <div v-else class="flex items-center">No same breed cats</div>
      </div>
      <div v-else class="flex items-center">Loading...</div>
    </div>
  </div>
</template>

<script setup>
import { useCatsStore } from "~/store/cats";

const catId = useRoute().params.id;

const catsStore = useCatsStore();
catsStore.get(catId);

function goBack() {
  catsStore.selectedCat = null;
  useRouter().go(-1);
}
</script>
