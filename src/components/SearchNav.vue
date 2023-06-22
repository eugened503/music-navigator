<template>
  <nav>
    <ul>
      <li>
        <router-link :to="{ name: rootName + 'Artists' }" exact
          >Artists</router-link
        >
      </li>
      <li>
        <router-link :to="{ name: rootName + 'Albums' }" exact
          >Albums</router-link
        >
      </li>
      <li>
        <router-link :to="{ name: rootName + 'Tracks' }" exact
          >Tracks</router-link
        >
      </li>
    </ul>
  </nav>
  <router-view />
</template>
<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import _ from "lodash";

const route = useRoute();

const rootRoute = computed(() => route.matched[0].path);
const rootName = computed(() => _.upperFirst(rootRoute.value.slice(1)));

</script>

<style lang="scss" scoped>
nav {
  ul {
    display: flex;
    gap: 20px;
  }
  li a {
    display: block;
    font-size: 14px;
    line-height: 24px;
    padding: 0 0 12px;
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
</style>
