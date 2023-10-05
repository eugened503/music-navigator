import { defineStore } from 'pinia'

type State = {
  page: {
    [key: string]: number
  }
  perPage: {
    [key: string]: number
  }
  pages: {
    [key: string]: number[]
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
    getNextPage(pageName: string): void {
      this.page[pageName] = this.page[pageName] + 1
    },

    getPrevPage(pageName: string): void {
      this.page[pageName] = this.page[pageName] - 1
    },

    getPageNumber(pageNumber: number, pageName: string): void {
      this.page[pageName] = pageNumber
    },

    clearPages(pageName: string): void {
      this.pages[pageName] = []
    },

    addPages(pageName: string, index: number): void {
      this.pages[pageName].push(index)
    },

    resetPage(pageName: string): void {
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
      return (pageName: string) => state.page[pageName]
    },

    getPerPage: (state: State) => {
      return (pageName: string) => state.perPage[pageName]
    },

    getPages: (state: State) => {
      return (pageName: string) => state.pages[pageName]
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
