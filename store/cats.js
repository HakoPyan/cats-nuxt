import { defineStore } from "pinia";

export const useCatsStore = defineStore("cats", {
  state() {
    return {
      data: [],
      loading: false,
      currentPage: 1,
      selectedCat: null,
      sameBreedCats: [],
    };
  },
  actions: {
    async baseList(params) {
      let cats;
      this.loading = true;
      await $fetch("https://api.thecatapi.com/v1/images/search", {
        query: {
          api_key: import.meta.env.VITE_CATS_API_KEY,
          ...params,
        },
      })
        .then((data) => (cats = data))
        .catch((error) => console.error("Error fetching:", error))
        .finally(() => (this.loading = false));
      return cats;
    },
    async list() {
      this.data = await this.baseList({
        order: "DESC",
        limit: 12,
        page: this.currentPage - 1,
      });
    },
    async get(catId) {
      this.loading = true;
      await $fetch(`https://api.thecatapi.com/v1/images/${catId}`)
        .then(async (data) => {
          this.selectedCat = data;
          if (data.breeds?.length) {
            const breed_ids = data.breeds.reduce(
              (val, b) => (val += b.id + ","),
              ""
            );
            this.sameBreedCats = await this.baseList({ breed_ids, limit: 3 });
          }
        })
        .catch((error) => console.error("Error fetching:", error))
        .finally(() => (this.loading = false));
    },
  },
});
