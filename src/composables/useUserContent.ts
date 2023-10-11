import { ComputedRef, computed, Ref } from 'vue'
import { useStoreMusic } from '@stores/storeMusic'
import { storeToRefs } from 'pinia'
import { FirestoreItem, Image, Music } from '@/types/firestoreTypes'

type Map = {
  albums: {
    deleteItems: (idAlbum: string, id: string) => void
    addItems: (album: FirestoreItem, id: string) => void
  }
  artists: {
    deleteItems: (idArtist: string, id: string) => void
    addItems: (artist: FirestoreItem, id: string) => void
  }
  tracks: {
    deleteItems: (idTrack: string, id: string) => void
    addItems: (track: FirestoreItem, id: string) => void
  }
}

type Item = {
  artist?: string
  name: string | undefined
  image?: Record<string, undefined> | undefined
  play?: string | undefined
  listeners?: string
}

type UserContent = {
  lovedItems: (nameItem: string | undefined, artistItem: string | undefined) => boolean
  handleItems: (obj: Item) => void
  isImage: ComputedRef<string | undefined>
}

export default function useUserContent(
  currentName: string,
  imgRef: Ref<Record<string, undefined> | undefined>
): UserContent {
  const { getMusic, getUid } = storeToRefs(useStoreMusic())
  const { addAlbums, deleteAlbums, addTracks, deleteTracks, addArtists, deleteArtists } =
    useStoreMusic()

  const map: Map = {
    albums: {
      deleteItems: deleteAlbums,
      addItems: addAlbums
    },
    artists: {
      deleteItems: deleteArtists,
      addItems: addArtists
    },
    tracks: {
      deleteItems: deleteTracks,
      addItems: addTracks
    }
  }

  const uid: string | null = getUid.value
  const items: ComputedRef<FirestoreItem[]> = computed(
    () => getMusic.value[currentName as keyof Music]
  )
  const isImage: ComputedRef<string | undefined> = computed(() =>
    getImage(imgRef.value as unknown as Image)
  )

  const getImage = (image: Image): string | undefined => {
    if (image) {
      const values = Object.values(image)
      return values.find((value: string) => value.length > 10)
    } else {
      return new URL('../assets/images/image.svg', import.meta.url).href
    }
  }

  const handleItems = (obj: Item) => {
    const loaded = lovedItems(obj.name, obj.artist)
    if (uid) {
      if (loaded) {
        const idItem = handleIdItem(obj.name)
        if (idItem !== undefined) {
          map[currentName as keyof Music].deleteItems(idItem, uid)
        }
      } else {
        switch (currentName) {
          case 'artists':
            map[currentName as keyof Music].addItems(obj as unknown as FirestoreItem, uid)
            break
          case 'albums':
            map[currentName as keyof Music].addItems(obj as unknown as FirestoreItem, uid)
            break
          default:
            map[currentName as keyof Music].addItems(obj as unknown as FirestoreItem, uid)
        }
      }
    }
  }

  const lovedItems = (nameItem: string | undefined, artistItem: string | undefined): boolean => {
    const name = items.value.some((item: { name: string }) => item.name === nameItem)

    // для альбомов
    if (artistItem) {
      const artist = items.value.some((item) => item.artist === artistItem)
      return name && artist
    }

    //для треков и исполнителей
    return name
  }

  const handleIdItem = (nameItem: string | undefined): string | undefined => {
    const item: FirestoreItem | undefined = items.value.find(
      (item: { name: string }) => item.name === nameItem
    )
    return item?.id
  }

  return { lovedItems, handleItems, isImage }
}
