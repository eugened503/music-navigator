<template>
  <div class="content">
    <Header></Header>
    <!-- <div id="nav" v-if="accessToken">
      <router-link :to="{ name: 'Search' }">Search</router-link> |
      <router-link :to="{ name: 'Favourite' }">Favourite</router-link> |
      <button @click="logout">Logout</button>
    </div>
    <router-view /> -->

  </div>
</template>

<script setup>
import { onBeforeMount, computed, watch } from "vue";
import { useStoreMusic } from "./stores/storeMusic";
import { useStoreUser } from "./stores/storeUser";
import Header from "./components/Header.vue";

const { fetchUser, $state } = useStoreUser();
const { getElementId } = useStoreMusic();
const uid = computed(() => $state.uid);
//const accessToken = computed(() => $state.accessToken);

onBeforeMount(fetchUser);
watch(uid, getElementId);
</script>

<style lang="scss" scoped>
.content {
  min-width: 320px;
}

// #nav {
//   padding: 30px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 20px;

//   a {
//     &.router-link-active,
//     &.router-link-exact-active {
//       position: relative;
//       font-weight: 700;
//       &::after {
//         position: absolute;
//         height: 2px;
//         width: 100%;
//         background: #b90000;
//         content: "";
//         bottom: -1px;
//         left: 0;
//       }
//     }
//   }
// }

// #nav a,
// button {
//   font-weight: bold;
//   color: #2c3e50;
// }

// button {
//   font-size: 16px;
// }
</style>
