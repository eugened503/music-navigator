<template>
  <header class="header">
    <router-link :to="{ name: 'Search' }">
      <img class="header__vinyl" src="../assets/images/vinyl.svg" alt="vinyl" />
    </router-link>
    <div class="player">
      <img class="player__item" src="../assets/images/player_start.svg" alt="start" />
      <img class="player__item" src="../assets/images/player_play.svg" alt="play" />
      <img class="player__item" src="../assets/images/player_end.svg" alt="end" />
    </div>
    <div class="header__logo">
      <p>Find Your Music</p>
    </div>
    <div class="navigator">
      <div v-if="getAccessToken" class="navigator__links">
        <router-link :to="{ name: 'Search' }">Search</router-link> |
        <router-link :to="{ name: 'Favourite' }">Favourite</router-link>
        <button class="button" @click="logout">Logout</button>
      </div>
      <div v-else class="navigator__buttons">
        <router-link v-if="rootRoute === '/login'" class="button" :to="{ name: 'Register' }"
          >Sign Up</router-link
        >
        <router-link v-else class="button" :to="{ name: 'Login' }">Log In</router-link>
      </div>
    </div>
  </header>
  <router-view />
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useStoreUser } from '@stores/storeUser'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

const route = useRoute()
const rootRoute = computed(() => route.matched[0]?.path)
const { getAccessToken } = storeToRefs(useStoreUser())
const { logout } = useStoreUser()
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: $clr-black;
  padding: 10px 20px;
  z-index: 1;
  top: 0;

  @media screen and (max-width: $laptop-small) {
    padding: 10px 10px;
  }

  a {
    display: flex;
  }

  &__vinyl {
    width: 40px;
    height: 40px;
    @media screen and (max-width: $laptop-small) {
      display: none;
    }
  }
  .player {
    margin: 0 0 0 65px;
    display: flex;
    gap: 20px;
    @media screen and (max-width: $laptop-small) {
      display: none;
    }
  }

  &__logo {
    padding: 10px 15px;
    background-color: $clr-carrot;
    color: $clr-white;
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
    width: 137px;
    @media screen and (max-width: $laptop-small) {
      display: none;
    }
    p {
      color: inherit;
      font-weight: 600;
    }
  }
  .navigator {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 0 0 auto;
    &__links {
      display: flex;
      align-items: center;
      color: $clr-white;
      gap: 10px;
      a {
        color: inherit;
        &.router-link-active,
        &.router-link-exact-active {
          position: relative;
          font-weight: 700;
          &::after {
            position: absolute;
            height: 2px;
            width: 100%;
            background: $clr-carrot;
            content: '';
            bottom: -4px;
            left: 0;
          }
        }
      }
    }
    .button {
      min-width: 121px;
      @media screen and (max-width: $laptop-small) {
        min-width: unset;
        padding: 8px;
      }
    }
  }
}
</style>
