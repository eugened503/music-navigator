import { defineStore } from 'pinia'
const baseUrl = 'https://ws.audioscrobbler.com/2.0'
const apiKey = 'bb0926934a9df6d160484c38b4293fca'
import axios from 'axios'
import { LastFmItem } from '@/types/lastFmTypes'

type State = {
  tracks: LastFmItem[]
  albums: LastFmItem[]
  artists: LastFmItem[]
  error: string | null
  loaded: boolean
  trackLoaded: boolean
  albumLoaded: boolean
  artistLoaded: boolean
  currentRequest: string | null
  trackRequest: string | null
  albumRequest: string | null
  artistRequest: string | null
}

type ErrorData = {
  response: {
    data: {
      message: string
    }
  }
}

export const useStoreAPI = defineStore('storeAPI', {
  state: (): State => {
    return {
      tracks: [],
      albums: [],
      artists: [],
      error: null,
      loaded: false,
      trackLoaded: false,
      albumLoaded: false,
      artistLoaded: false,
      currentRequest: null,
      trackRequest: null,
      albumRequest: null,
      artistRequest: null
    }
  },
  actions: {
    async trackSearch(track: string): Promise<void> {
      this.trackLoaded = false
      this.loaded = true
      try {
        const res = await this.getRes('track', track)
        this.tracks = res.data?.results.trackmatches.track
        this.trackRequest = track
        this.setCurrentRequest(track)
      } catch (error: unknown) {
        const knownError = error as ErrorData
        this.error = knownError.response?.data.message
        console.log(error)
      }

      this.trackLoaded = true
      this.loaded = false
    },

    async albumSearch(album: string): Promise<void> {
      this.albumLoaded = false
      this.loaded = true
      try {
        const res = await this.getRes('album', album)

        this.albums = res.data?.results.albummatches.album
        this.albumRequest = album
        this.setCurrentRequest(album)
      } catch (error: unknown) {
        const knownError = error as ErrorData
        this.error = knownError.response?.data.message
        console.log(error)
      }

      this.albumLoaded = true
      this.loaded = false
    },

    async artistSearch(artist: string): Promise<void> {
      this.artistLoaded = false
      this.loaded = true
      try {
        const res = await this.getRes('artist', artist)

        this.artists = res.data?.results.artistmatches.artist
        this.artistRequest = artist
        this.setCurrentRequest(artist)
      } catch (error: unknown) {
        const knownError = error as ErrorData
        this.error = knownError.response?.data.message
        console.log(error)
      }

      this.artistLoaded = true
      this.loaded = false
    },

    setCurrentRequest(currentRequest: string | null): void {
      this.currentRequest = currentRequest
    },

    resetData(): void {
      this.tracks = []
      this.albums = []
      this.artists = []
      this.error = null
      this.trackLoaded = false
      this.albumLoaded = false
      this.artistLoaded = false
      this.currentRequest = null
      this.trackRequest = null
      this.albumRequest = null
      this.artistRequest = null
    },

    getRes(method: string, searchName: string) {
      return axios.get(
        baseUrl +
          '/?method=' +
          `${method}` +
          '.search&' +
          `${method}` +
          '=' +
          `${searchName}` +
          '&api_key=' +
          apiKey +
          '&format=json' +
          '&limit=30'
      )
    }
  },

  getters: {
    getError: (state: State): string | null => {
      return state.error
    },

    getCurrentRequest: (state: State): string | null => {
      return state.currentRequest
    },

    getLoaded: (state: State): boolean => {
      return state.loaded
    },

    //Tracks
    getTracks: (state: State): LastFmItem[] => {
      return state.tracks
    },

    getTrackLoaded: (state: State): boolean => {
      return state.trackLoaded
    },

    getTrackRequest: (state: State): string | null => {
      return state.trackRequest
    },

    //Albums
    getAlbums: (state: State): LastFmItem[] => {
      return state.albums
    },

    getAlbumLoaded: (state: State): boolean => {
      return state.albumLoaded
    },

    getAlbumRequest: (state: State): string | null => {
      return state.albumRequest
    },

    //Artists
    getArtists: (state: State): LastFmItem[] => {
      return state.artists
    },

    getArtistLoaded: (state: State): boolean => {
      return state.artistLoaded
    },

    getArtistRequest: (state: State): string | null => {
      return state.artistRequest
    }
  }
  // persist: {
  //   enabled: true,
  //   strategies: [
  //     {
  //       key: "storeAPI",
  //       storage: localStorage,
  //     },
  //   ],
  // },
})
