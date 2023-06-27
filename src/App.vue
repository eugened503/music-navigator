<template>
  <Header></Header>
  <Footer></Footer>
</template>

<script setup>
import { onBeforeMount, computed, watch } from "vue";
import { useStoreMusic } from "./stores/storeMusic";
import { useStoreUser } from "./stores/storeUser";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

const { fetchUser, $state } = useStoreUser();
const { getElementId } = useStoreMusic();
const uid = computed(() => $state.uid);

onBeforeMount(fetchUser);

watch(uid, (newUid) => {
  if (newUid) {
    getElementId(newUid);
  }
});
</script>