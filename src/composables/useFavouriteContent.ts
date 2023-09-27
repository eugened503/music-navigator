import { computed } from 'vue'
import { useStoreMusic } from '@stores/storeMusic'
import { storeToRefs } from 'pinia'

export default function useFavouriteContent(name: string) {
  const { getMusic } = storeToRefs(useStoreMusic())
  const favouriteItems = computed(() => getMusic.value[name])

  return { favouriteItems }
}
