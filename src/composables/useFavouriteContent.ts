import { computed, ComputedRef } from 'vue'
import { useStoreMusic } from '@stores/storeMusic'
import { storeToRefs } from 'pinia'
import { Album, Artist, Track, Music } from '@/types/music'

type FavouriteItems = ComputedRef<Album[] | Artist[] | Track[]>

export default function useFavouriteContent(name: string | undefined): {
  favouriteItems: FavouriteItems
} {
  const { getMusic } = storeToRefs(useStoreMusic())
  const favouriteItems: FavouriteItems = computed(() => getMusic.value[name as keyof Music])

  return { favouriteItems }
}
