<template>
  <div id="nav" v-if="accessToken">
    <router-link :to="{ name: 'Search' }">Search</router-link> |
    <router-link :to="{ name: 'Favourite' }">Favourite</router-link> |
    <button @click="logout">Logout</button>
  </div>
  <router-view />
</template>

<script setup>
import { onBeforeMount, onMounted, computed, watch } from "vue";
import { useStoreMusic } from "./stores/storeMusic";
import { useStoreUser } from "./stores/storeUser";

const { logout, fetchUser, $state } = useStoreUser();
const { getMusic, getElementId } = useStoreMusic();

onBeforeMount(() => {
  fetchUser();
});

const uid = computed(() => $state.uid);
const accessToken = computed(() => $state.accessToken);

watch(uid, getElementId);


</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;

  a {
    &.router-link-active,
    &.router-link-exact-active {
      position: relative;
      font-weight: 700;
      &::after {
        position: absolute;
        height: 2px;
        width: 100%;
        background: #b90000;
        content: "";
        bottom: -1px;
        left: 0;
      }
    }
  }
}

#nav a,
button {
  font-weight: bold;
  color: #2c3e50;
}

button {
  font-size: 16px;
}
</style>
