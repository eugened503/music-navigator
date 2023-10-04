import { ComputedRef, Ref, computed } from 'vue'
import { useStoreMusic } from '@stores/storeMusic'
import { storeToRefs } from 'pinia'

type Content = {
  lovedItems: any
  handleItems: any
  isImage: ComputedRef<string>
}

type Image = {
  '#text': string
  size: string
}

export default function useUserContent(currentName: string, imgRef: any): Content {
  const { getMusic, getUid } = storeToRefs(useStoreMusic())
  const { addAlbums, deleteAlbums, addTracks, deleteTracks, addArtists, deleteArtists } =
    useStoreMusic()

  const map = {
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

  //console.log('imgRef', imgRef.value)

  const music = computed(() => getMusic.value)
  const uid = computed(() => getUid.value)
  const items = computed(() => music.value[currentName])
  const isImage = computed(() => getImage(imgRef.value))

  //console.log('isImage', isImage)

  const getImage = (image: Image) => {
    if (image) {
      const values = Object.values(image)
      return values.find((value: string) => value.length > 10)
    } else {
      return new URL('../assets/images/image.svg', import.meta.url).href
    }
  }

  const handleItems = (obj: { name: string; artist: string }) => {
    const loaded = lovedItems(obj.name, obj.artist)
    if (loaded) {
      const idItem = handleIdItem(obj.name)
      map[currentName].deleteItems(idItem, uid.value)
    } else {
      map[currentName].addItems(obj, uid.value)
    }
  }

  const lovedItems = (nameItem: string, artistItem: any) => {
    const name = items.value?.some((item: { name: string }) => item.name === nameItem)

    if (artistItem) {
      const artist = items.value?.some((item: { artist: any }) => item.artist === artistItem)
      return name && artist
    }

    return name
  }

  const handleIdItem = (nameItem: string) => {
    return items.value?.find((item: { name: string }) => item.name === nameItem).id
  }

  return { lovedItems, handleItems, isImage }
}
