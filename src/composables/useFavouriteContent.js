import { computed } from "vue";
import { useStoreMusic } from "../stores/storeMusic";
import { storeToRefs } from "pinia";

export default function useFavouriteContent(name) {
  const { getMusic } = storeToRefs(useStoreMusic());

  const music = computed(() => getMusic.value);
  const favouriteItems = computed(() => music.value[name]);

  return { favouriteItems };
}
