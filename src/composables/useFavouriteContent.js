import { computed } from "vue";
import { useStoreUser } from "../stores/storeUser";
import { useStoreMusic } from "../stores/storeMusic";

export default function useFavouriteContent(name) {
  const { $state } = useStoreUser();
  const { getUserMusic } = useStoreMusic();

  const uid = computed(() => $state.uid);
  const favouriteMusic = computed(() => getUserMusic(uid.value));
  const favouriteItems = computed(() => favouriteMusic.value?.music[name]);

  return { favouriteItems };
}
