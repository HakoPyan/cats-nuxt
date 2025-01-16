import { defineStore } from "pinia";

export const useCatsStore = defineStore("cats", {
  state() {
    return {
      data: [],
      loading: false,
      currentPage: 0,
      randomCat: null,
      selectedCat: null,
    };
  },
  actions: {
    async fetchRandomCat() {
      this.loading = true;
      await $fetch("https://api.thecatapi.com/v1/images/search")
        .then((data) => (this.randomCat = data[0]))
        .catch((error) => console.error("Error fetching random cat:", error))
        .finally(() => (this.loading = false));
    },
    async fetch(page = 0) {
      this.loading = true;
      await $fetch("https://api.thecatapi.com/v1/images/search", {
        query: {
          api_key: import.meta.env.VITE_CATS_API_KEY,
          order: "DESC",
          limit: 12,
          page: this.currentPage,
        },
      })
        .then((data) => {
          this.data = data;
          this.currentPage = page;
        })
        .catch((error) => console.error("Error fetching random cat:", error))
        .finally(() => (this.loading = false));
    },
    async getDetailed(catId) {
      this.loading = true;
      try {
        const data = await $fetch(
          `https://api.thecatapi.com/v1/images/${catId}`
        );
        this.selectedCat = data;
      } catch (error) {
        console.error("Error fetching random cat:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
