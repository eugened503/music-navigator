import { computed } from "vue";
import { useStoreUser } from "../stores/storeUser";

export default function useUserContent(currentName, addItems, deleteItems, getUserMusic) {
  const store = useStoreUser();
  const uid = computed(() => store.$state.uid);
  const userMusic = computed(() => getUserMusic(uid.value));
  const id = computed(() => userMusic.value.id);
  const items = computed(() => userMusic.value?.music[currentName]);

  const handleItems = (obj) => {
    const loaded = lovedItems(obj.name, obj.artist || null);
    if (loaded) {
      const idItem = handleIdItem(obj.name);
      deleteItems(idItem, id.value);
    } else {
      addItems(obj, id.value);
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
