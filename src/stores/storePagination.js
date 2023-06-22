import { defineStore } from "pinia";

export const useStorePagination = defineStore("storePagination", {
  state: () => {
    return {
      page: {
        tracks: 1,
        albums: 1,
        artists: 1,
      },
      perPage: {
        tracks: 4,
        albums: 4,
        artists: 4,
      },
      pages: {
        tracks: [],
        albums: [],
        artists: [],
      },
    };
  },
  actions: {
    getNextPage(pageName) {
      this.page[pageName] = this.page[pageName] + 1;
    },

    getPrevPage(pageName) {
      this.page[pageName] = this.page[pageName] - 1;
    },

    getPageNumber(pageNumber, pageName) {
      this.page[pageName] = pageNumber;
    },

    clearPages(pageName) {
      this.pages[pageName] = [];
    },

    addPages(pageName, index) {
      this.pages[pageName].push(index);
    },

    resetPage(pageName) {
      this.page[pageName] = 1;
    },
  },
  persist: {
    enabled: true,
  },
});
