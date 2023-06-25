import _ from "lodash";
import { defineStore } from "pinia";
import {
  getDocs,
  getDoc,
  collection,
  onSnapshot,
  addDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  arrayUnion,
} from "firebase/firestore";
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";

const musicCollectionRef = collection(db, "music");
const musicCollectionQuery = query(musicCollectionRef, orderBy("date", "desc"));

export const useStoreMusic = defineStore("storeMusic", {
  state: () => {
    return {
      musicLoaded: false,
      music: {},
      uid: null,
    };
  },
  actions: {
    // async getMusic() {
    //   this.musicLoaded = false;
    //   onSnapshot(musicCollectionQuery, (querySnapshot) => {
    //     const usersCollectionMusic = [];
    //     querySnapshot.forEach((doc) => {
    //       const musicItem = {
    //         id: doc.id,
    //         uid: doc.data().uid,
    //         music: doc.data().music,
    //       };
    //       usersCollectionMusic.push(musicItem);
    //     });
    //     this.usersCollectionMusic = usersCollectionMusic;
    //     this.musicLoaded = true;
    //   });
    // },

    async addCollection(userUid) {
      // const newMusicAdded = await addDoc(musicCollectionRef, {
      //   date: Date.now(),
      //   uid: userUid,
      //   music: { tracks: [], albums: [], artists: [] },
      // });

      //this.musicId = newMusicAdded.id;
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
      //   const docRef = doc(musicCollectionRef, userId);
      //   try {
      //     const docSnap = await getDoc(docRef);
      //     if (docSnap.exists()) {
      //       console.log(docSnap.data());
      //     } else {
      //       console.log("Document does not exist");
      //     }
      //   } catch (error) {
      //     console.log(error);
      //   }
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
    // getUserMusic: (state) => (uid) => {
    //   return state.usersCollectionMusic.find(
    //     (collection) => collection.uid === uid
    //   );
    // },
    getMusic: (state) => {
      return state.music;
    },
    getUid: (state) => {
      return state.uid;
    },
  },
});
