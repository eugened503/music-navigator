import { computed, ComputedRef } from 'vue'
import { useStoreMusic } from '@stores/storeMusic'
import { storeToRefs } from 'pinia'
import { FirestoreItem, Music } from '@/types/firestoreTypes'

type FavouriteItems = ComputedRef<FirestoreItem[]>

export default function useFavouriteContent(name: string | undefined): {
  favouriteItems: FavouriteItems
} {
  const { getMusic } = storeToRefs(useStoreMusic())
  const favouriteItems: FavouriteItems = computed(() => getMusic.value[name as keyof Music])

  return { favouriteItems }
}
