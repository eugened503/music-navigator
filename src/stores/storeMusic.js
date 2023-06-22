import _ from "lodash";
import { defineStore } from "pinia";
import {
  getDocs,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  arrayUnion,
} from "firebase/firestore";

import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

const musicCollectionRef = collection(db, "music");
const musicCollectionQuery = query(musicCollectionRef, orderBy("date", "desc"));

export const useStoreMusic = defineStore("storeMusic", {
  state: () => {
    return {
      usersCollectionMusic: [],
      musicLoaded: false,
    };
  },
  actions: {
    async getMusic() {
      this.musicLoaded = false;
      onSnapshot(musicCollectionQuery, (querySnapshot) => {
        const usersCollectionMusic = [];
        querySnapshot.forEach((doc) => {
          const musicItem = {
            id: doc.id,
            uid: doc.data().uid,
            music: doc.data().music,
          };
          usersCollectionMusic.push(musicItem);
        });
        this.usersCollectionMusic = usersCollectionMusic;
        this.musicLoaded = true;
      });
    },

    async addCollection(userUid) {
      await addDoc(musicCollectionRef, {
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

      const clone = _.cloneDeep(this.usersCollectionMusic);
      const { music } = clone.find((item) => item.id === id);

      music[name].push(obj);

      await updateDoc(doc(musicCollectionRef, id), {
        music,
      });
    },

    async deleteItems(idItem, id, name) {
      const clone = _.cloneDeep(this.usersCollectionMusic);
      const { music } = clone.find((item) => item.id === id);
      const newItems = music[name].filter((item) => item.id !== idItem);

      music[name] = newItems;

      await updateDoc(doc(musicCollectionRef, id), {
        music,
      });
    },
  },

  getters: {
    getUserMusic: (state) => (uid) => {
      return state.usersCollectionMusic.find(
        (collection) => collection.uid === uid
      );
    },
    
  },
});
