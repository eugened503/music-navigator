<template>
  <Header></Header>
  <Footer></Footer>
  <Loader v-if="getLoaded"></Loader>
</template>

<script setup>
import { onBeforeMount, watch} from "vue";
import { useStoreMusic } from "./stores/storeMusic";
import { useStoreUser } from "./stores/storeUser";
import { storeToRefs } from "pinia";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Loader from "./components/Loader.vue";

const { fetchUser } = useStoreUser();
const { getElementId } = useStoreMusic();
const { getLoaded, getUid } = storeToRefs(useStoreUser());

onBeforeMount(fetchUser);

watch(getUid, (newUid) => {
  if (newUid) {
    getElementId(newUid);
  }
});
</script>
