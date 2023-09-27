import { defineStore } from 'pinia'

type State = {
  page: {
    tracks: number
    albums: number
    artists: number
  }
  perPage: {
    tracks: number
    albums: number
    artists: number
  }
  pages: {
    tracks: number[]
    albums: number[]
    artists: number[]
  }
}

export const useStorePagination = defineStore('storePagination', {
  state: (): State => {
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
    getNextPage(pageName: number): void {
      this.page[pageName] = this.page[pageName] + 1
    },

    getPrevPage(pageName: number): void {
      this.page[pageName] = this.page[pageName] - 1
    },

    getPageNumber(pageNumber: number, pageName: number): void {
      this.page[pageName] = pageNumber
    },

    clearPages(pageName: number): void {
      this.pages[pageName] = []
    },

    addPages(pageName: number, index: number): void {
      this.pages[pageName].push(index)
    },

    resetPage(pageName: number): void {
      this.page[pageName] = 1
    },

    resetStore(): void {
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
    getPage: (state: State) => {
      return (pageName: number) => state.page[pageName]
    },

    getPerPage: (state: State) => {
      return (pageName: number) => state.perPage[pageName]
    },

    getPages: (state: State) => {
      return (pageName: number) => state.pages[pageName]
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
