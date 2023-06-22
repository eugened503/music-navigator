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
      try {
        const res = await this.getRes("track", track);

        this.tracks = res.data?.results.trackmatches.track;
        this.trackRequest = track;
        this.getCurrentRequest(track);
      } catch (error) {
        this.error = error.response?.data.message;
        console.log(error);
      }

      this.trackLoaded = true;
    },

    async albumSearch(album) {
      this.albumLoaded = false;
      try {
        const res = await this.getRes("album", album);

        this.albums = res.data?.results.albummatches.album;
        this.albumRequest = album;
        this.getCurrentRequest(album);
      } catch (error) {
        this.error = error.response?.data.message;
        console.log(error);
      }

      this.albumLoaded = true;
    },

    async artistSearch(artist) {
      this.artistLoaded = false;
      try {
        const res = await this.getRes("artist", artist);

        this.artists = res.data?.results.artistmatches.artist;
        this.artistRequest = artist;
        this.getCurrentRequest(artist);
      } catch (error) {
        this.error = error.response?.data.message;
        console.log(error);
      }

      this.artistLoaded = true;
    },

    getCurrentRequest(currentRequest) {
      this.currentRequest = currentRequest;
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
          "&limit=15"
      );
    },
  },

  getters: {
    getTracksInfo: (state) => {
      return state.tracks.map((track) => {
        const item = {
          artist: track.artist,
          name: track.name,
        };
        return item;
      });
    },
  },
  persist: {
    enabled: true,
  },
});
