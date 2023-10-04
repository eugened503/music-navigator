import _ from 'lodash'
import { defineStore } from 'pinia'
import { collection, onSnapshot, setDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import { v4 as uuidv4 } from 'uuid'

const musicCollectionRef = collection(db, 'music')

type Image = {
  '#text': string
  size: string
}

type Album = {
  artist?: string
  id: string
  image: Image
  name: string
  play: string
}

type Artist = {
  id: string
  image: Image
  listeners?: Image
  name: string
  play: string
}

type Track = {
  artist?: string
  id: string
  image: Image
  listeners?: Image
  name: string
  play: string
}

type Music = {
  albums: Album[]
  artists: Artist[]
  tracks: Track[]
}

type State = {
  musicLoaded: boolean
  music: Music
  uid: string | null
}

export const useStoreMusic = defineStore('storeMusic', {
  state: (): State => {
    return {
      musicLoaded: false,
      music: {
        albums: [],
        artists: [],
        tracks: []
      },
      uid: null
    }
  },
  actions: {
    async addCollection(userUid: string): Promise<void> {
      await setDoc(doc(musicCollectionRef, userUid), {
        date: Date.now(),
        uid: userUid,
        music: { tracks: [], albums: [], artists: [] }
      })
    },

    addTracks(track: Track, id: string): void {
      this.addItems(track, id, 'tracks')
    },

    deleteTracks(idTrack: string, id: string): void {
      this.deleteItems(idTrack, id, 'tracks')
    },

    addAlbums(album: Album, id: string): void {
      this.addItems(album, id, 'albums')
    },

    deleteAlbums(idAlbum: string, id: string): void {
      this.deleteItems(idAlbum, id, 'albums')
    },

    addArtists(artist: Artist, id: string): void {
      this.addItems(artist, id, 'artists')
    },

    deleteArtists(idArtist: string, id: string): void {
      this.deleteItems(idArtist, id, 'artists')
    },

    async addItems(obj: Track | Album | Artist, id: string, name: string): Promise<void> {
      obj.id = uuidv4()

      const music: Music = _.cloneDeep(this.music)
      music[name as keyof Music].push(obj)

      await updateDoc(doc(musicCollectionRef, id), {
        music
      })
    },

    async deleteItems(idItem: string, id: string, name: string): Promise<void> {
      const music: Music = _.cloneDeep(this.music)
      const newItems = music[name as keyof Music].filter((item: { id: string }) => item.id !== idItem)
      music[name as keyof Music] = newItems

      await updateDoc(doc(musicCollectionRef, id), {
        music
      })
    },

    async getElementId(userUid: string): Promise<void> {
      this.musicLoaded = false
      onSnapshot(doc(musicCollectionRef, userUid), (doc) => {
        this.music = doc.data()?.music
        this.uid = doc.data()?.uid
        this.musicLoaded = true
      })
    },

    clearStore(): void {
      this.music =  {
        albums: [],
        artists: [],
        tracks: []
      }
      this.uid = null
    }
  },
  getters: {
    getMusic: (state: State): Music => {
      return state.music
    },

    getUid: (state: State): string | null => {
      return state.uid
    }
  }
})
