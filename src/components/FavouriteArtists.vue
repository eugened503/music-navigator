<template>
  <section class="artists">
      <h1>Favourite Artists</h1>
      <div class="artists__body body">
        <Artist
          v-for="artist in favouriteItems"
          :key="artist.id"
          :play="artist.url"
          :image="artist.image"
          :name="artist.name"
          :listeners="artist.listeners"
          v-lazy-load
        />
    </div>
  </section>
</template>
<script setup>
import useFavouriteContent from "../composables/useFavouriteContent";
import Artist from "./Artist.vue";

const { favouriteItems } = useFavouriteContent("artists");
</script>

<style lang="scss" scoped>
.artists {
  &__body {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 24px;
    :deep(.artist) {
      visibility: hidden;
      opacity: 0;
      &.active {
        visibility: visible;
        transition: visibility 0.3s linear, opacity 0.3s linear;
        opacity: 1;
      }
    }
  }
}
</style>
