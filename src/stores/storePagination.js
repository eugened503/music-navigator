import { defineStore } from 'pinia'

export const useStorePagination = defineStore('storePagination', {
  state: () => {
    return {
      page: {
        tracks: 1,
        albums: 1,
        artists: 1
      },
      perPage: {
        tracks: 4,
        albums: 4,
        artists: 4
      },
      pages: {
        tracks: [],
        albums: [],
        artists: []
      }
    }
  },
  actions: {
    getNextPage(pageName) {
      this.page[pageName] = this.page[pageName] + 1
    },

    getPrevPage(pageName) {
      this.page[pageName] = this.page[pageName] - 1
    },

    getPageNumber(pageNumber, pageName) {
      this.page[pageName] = pageNumber
    },

    clearPages(pageName) {
      this.pages[pageName] = []
    },

    addPages(pageName, index) {
      this.pages[pageName].push(index)
    },

    resetPage(pageName) {
      this.page[pageName] = 1
    },

    resetStore() {
      this.page = {
        tracks: 1,
        albums: 1,
        artists: 1
      }
      this.perPage = {
        tracks: 4,
        albums: 4,
        artists: 4
      }
      this.pages = {
        tracks: [],
        albums: [],
        artists: []
      }
    }
  },

  getters: {
    getPage: (state) => {
      return (pageName) => state.page[pageName]
    },

    getPerPage: (state) => {
      return (pageName) => state.perPage[pageName]
    },

    getPages: (state) => {
      return (pageName) => state.pages[pageName]
    }
  }
  // persist: {
  //   enabled: true,
  //   strategies: [
  //     {
  //       key: "pagination",
  //       storage: localStorage,
  //     },
  //   ],
  // },
})
