import { computed, watch, ref } from "vue";
import { useStoreMusic } from "../stores/storeMusic";
import { storeToRefs } from "pinia";

export default function useUserContent(currentName, addItems, deleteItems) {
  const { getMusic, getUid } = storeToRefs(useStoreMusic());
  const music = computed(() => getMusic.value);
  const uid = computed(() => getUid.value);
  const items = computed(() => music.value[currentName]);

  const handleItems = (obj) => {
    const loaded = lovedItems(obj.name, obj.artist || null);
    if (loaded) {
      const idItem = handleIdItem(obj.name);
      deleteItems(idItem, uid.value);
    } else {
      addItems(obj, uid.value);
    }
  };

  const lovedItems = (nameItem, artistItem) => {
    const name = items.value?.some((item) => item.name === nameItem);

    if (artistItem) {
      const artist = items.value?.some((item) => item.artist === artistItem);
      return name && artist;
    }

    return name;
  };

  const handleIdItem = (nameItem) => {
    return items.value?.find((item) => item.name === nameItem).id;
  };

  return { lovedItems, handleItems };
}
