<template>
  <section class="tracks">
    <h1>Favourite Tracks</h1>
    <TransitionGroup name="fade" tag="div" class="tracks__body body">
      <Track
        v-for="track in favouriteItems"
        :key="track.id"
        :artist="track.artist"
        :name="track.name"
        :image="track.image"
        :play="track.play"
        :listeners="track.listeners"
        v-lazy-load
      >
      </Track>
    </TransitionGroup>
  </section>
</template>
<script setup>
import useFavouriteContent from '@composables/useFavouriteContent'
import Track from './Track.vue'
const { favouriteItems } = useFavouriteContent('tracks')
</script>

<style lang="scss" scoped>
.tracks {
  &__body {
    :deep(.track) {
      visibility: hidden;
      &.active {
        animation: show-favourite linear 0.3s forwards;
      }
    }
  }
}
</style>
