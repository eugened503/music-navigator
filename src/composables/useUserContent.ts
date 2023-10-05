import { ComputedRef, computed, Ref } from 'vue'
import { useStoreMusic } from '@stores/storeMusic'
import { storeToRefs } from 'pinia'
import { Image, Album, Artist, Track, Music } from '@/types/music'

type Map = {
  albums: {
    deleteItems: (idAlbum: string, id: string) => void
    addItems: (album: Album, id: string) => void
  }
  artists: {
    deleteItems: (idArtist: string, id: string) => void
    addItems: (artist: Artist, id: string) => void
  }
  tracks: {
    deleteItems: (idTrack: string, id: string) => void
    addItems: (track: Track, id: string) => void
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

  //const uid: ComputedRef<string | null> = computed(() => getUid.value)
  const uid: string | null = getUid.value
  const items: Album[] | Artist[] | Track[] = getMusic.value[currentName as keyof Music]
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
            map[currentName as keyof Music].addItems(obj as unknown as Artist, uid)
            break
          case 'albums':
            map[currentName as keyof Music].addItems(obj as unknown as Album, uid)
            break
          default:
            map[currentName as keyof Music].addItems(obj as unknown as Track, uid)
        }
      }
    }
  }

  const lovedItems = (nameItem: string | undefined, artistItem: string | undefined): boolean => {
    const name = items.some((item: { name: string }) => item.name === nameItem)

    // для альбомов
    if (artistItem) {
      // const artist = items.some((item) => item.artist === artistItem)
      // return name && artist
    }

    console.log(name)
    //для треков и исполнителей
    return name
  }

  const handleIdItem = (nameItem: string | undefined): string | undefined => {
    const item: Album | Artist | Track | undefined = items.find(
      (item: { name: string }) => item.name === nameItem
    )
    return item?.id
  }

  return { lovedItems, handleItems, isImage }
}
