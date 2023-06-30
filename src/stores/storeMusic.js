import _ from "lodash";
import { defineStore } from "pinia";
import {
  collection,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

const musicCollectionRef = collection(db, "music");

export const useStoreMusic = defineStore("storeMusic", {
  state: () => {
    return {
      musicLoaded: false,
      music: {},
      uid: null,
    };
  },
  actions: {
    async addCollection(userUid) {
      await setDoc(doc(musicCollectionRef, userUid), {
        date: Date.now(),
        uid: userUid,
        music: { tracks: [], albums: [], artists: [] },
      });
    },

    addTracks(track, id) {
      this.addItems(track, id, "tracks");
    },

    deleteTracks(idTrack, id) {
      this.deleteItems(idTrack, id, "tracks");
    },

    addAlbums(album, id) {
      this.addItems(album, id, "albums");
    },

    deleteAlbums(idAlbum, id) {
      this.deleteItems(idAlbum, id, "albums");
    },

    addArtists(artist, id) {
      this.addItems(artist, id, "artists");
    },

    deleteArtists(idArtist, id) {
      this.deleteItems(idArtist, id, "artists");
    },

    async addItems(obj, id, name) {
      obj.id = uuidv4();

      const music = _.cloneDeep(this.music);
      music[name].push(obj);

      await updateDoc(doc(musicCollectionRef, id), {
        music,
      });
    },

    async deleteItems(idItem, id, name) {
      const music = _.cloneDeep(this.music);
      const newItems = music[name].filter((item) => item.id !== idItem);
      music[name] = newItems;

      await updateDoc(doc(musicCollectionRef, id), {
        music,
      });
    },

    async getElementId(userUid) {
      this.musicLoaded = false;
      onSnapshot(doc(musicCollectionRef, userUid), (doc) => {
        this.music = doc.data().music;
        this.uid = doc.data().uid;
        this.musicLoaded = true;
      });
    },

    clearStore() {
      this.music = {};
      this.uid = null;
    },
  },
  getters: {
    getMusic: (state) => {
      return state.music;
    },

    getUid: (state) => {
      return state.uid;
    },
  },
});
