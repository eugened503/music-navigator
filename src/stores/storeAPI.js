import { defineStore } from "pinia";
const baseUrl = "http://ws.audioscrobbler.com/2.0";
const apiKey = "bb0926934a9df6d160484c38b4293fca";
import axios from "axios";

export const useStoreAPI = defineStore("storeAPI", {
  state: () => {
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
      artistRequest: null,
    };
  },
  actions: {
    async trackSearch(track) {
      this.trackLoaded = false;
      this.loaded = true;
      try {
        const res = await this.getRes("track", track);

        this.tracks = res.data?.results.trackmatches.track;
        this.trackRequest = track;
        this.setCurrentRequest(track);
      } catch (error) {
        this.error = error.response?.data.message;
        console.log(error);
      }

      this.trackLoaded = true;
      this.loaded = false;
    },

    async albumSearch(album) {
      this.albumLoaded = false;
      this.loaded = true;
      try {
        const res = await this.getRes("album", album);

        this.albums = res.data?.results.albummatches.album;
        this.albumRequest = album;
        this.setCurrentRequest(album);
      } catch (error) {
        this.error = error.response?.data.message;
        console.log(error);
      }

      this.albumLoaded = true;
      this.loaded = false;
    },

    async artistSearch(artist) {
      this.artistLoaded = false;
      this.loaded = true;
      try {
        const res = await this.getRes("artist", artist);

        this.artists = res.data?.results.artistmatches.artist;
        this.artistRequest = artist;
        this.setCurrentRequest(artist);
      } catch (error) {
        this.error = error.response?.data.message;
        console.log(error);
      }

      this.artistLoaded = true;
      this.loaded = false;
    },

    setCurrentRequest(currentRequest) {
      this.currentRequest = currentRequest;
    },

    resetData() {
      this.tracks = [];
      this.albums = [];
      this.artists = [];
      this.error = null;
      this.trackLoaded = false;
      this.albumLoaded = false;
      this.artistLoaded = false;
      this.currentRequest = null;
      this.trackRequest = null;
      this.albumRequest = null;
      this.artistRequest = null;
    },

    getRes(method, searchName) {
      return axios.get(
        baseUrl +
          "/?method=" +
          `${method}` +
          ".search&" +
          `${method}` +
          "=" +
          `${searchName}` +
          "&api_key=" +
          apiKey +
          "&format=json" +
          "&limit=30"
      );
    },
  },

  getters: {
    getError: (state) => {
      return state.error;
    },

    getCurrentRequest: (state) => {
      return state.currentRequest;
    },

    getLoaded: (state) => {
      return state.loaded;
    },

    //Tracks
    getTracks: (state) => {
      return state.tracks;
    },

    getTrackLoaded: (state) => {
      return state.trackLoaded;
    },
   
    getTrackRequest: (state) => {
      return state.trackRequest;
    },

    //Albums
    getAlbums: (state) => {
      return state.albums;
    },
    
    getAlbumLoaded: (state) => {
      return state.albumLoaded;
    },
   
    getAlbumRequest: (state) => {
      return state.albumRequest;
    },

    //Artists
    getArtists: (state) => {
      return state.artists;
    },
    
    getArtistLoaded: (state) => {
      return state.artistLoaded;
    },
   
    getArtistRequest: (state) => {
      return state.artistRequest;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "storeAPI",
        storage: localStorage,
      },
    ],
  },
});
