import { computed } from 'vue'
import { useStoreMusic } from '@/stores/storeMusic'
import { storeToRefs } from 'pinia'

export default function useUserContent(currentName, addItems, deleteItems, imgRef) {
  const { getMusic, getUid } = storeToRefs(useStoreMusic())
  const music = computed(() => getMusic.value)
  const uid = computed(() => getUid.value)
  const items = computed(() => music.value[currentName])
  const isImage = computed(() => getImage(imgRef.value))

  const getImage = (image) => {
    const values = Object.values(image)
    return (
      values.find((value) => value.length > 10) ||
      new URL('../assets/images/image.svg', import.meta.url).href
    )
  }

  const handleItems = (obj) => {
    const loaded = lovedItems(obj.name, obj.artist)
    if (loaded) {
      const idItem = handleIdItem(obj.name)
      deleteItems(idItem, uid.value)
    } else {
      addItems(obj, uid.value)
    }
  }

  const lovedItems = (nameItem, artistItem) => {
    const name = items.value?.some((item) => item.name === nameItem)

    if (artistItem) {
      const artist = items.value?.some((item) => item.artist === artistItem)
      return name && artist
    }

    return name
  }

  const handleIdItem = (nameItem) => {
    return items.value?.find((item) => item.name === nameItem).id
  }

  return { lovedItems, handleItems, isImage }
}
