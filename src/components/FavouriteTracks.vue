<template>
  <section class="tracks">
    <h1>Favourite Tracks</h1>
    <div class="tracks__body">
      <Track
        v-for="track in favouriteItems"
        :key="track.id"
        :artist="track.artist"
        :name="track.name"
        :image="track.image"
        :play="track.url"
        :listeners="track.listeners"
        v-lazy-load
      >
      </Track>
    </div>
  </section>
</template>
<script setup>
import useFavouriteContent from "../composables/useFavouriteContent";
import Track from "./Track.vue";
const { favouriteItems } = useFavouriteContent("tracks");
</script>

<style lang="scss" scoped>
.tracks {
  &__body {
    margin: 24px 0 0;
    :deep(.track) {
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
