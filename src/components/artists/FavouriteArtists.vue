<template>
  <section class="artists">
    <h1>Favourite Artists</h1>
    <TransitionGroup name="fade" tag="div" class="artists__body body">
      <Artist
        v-for="artist in favouriteItems"
        :key="artist.id"
        :play="artist.play"
        :image="artist.image"
        :name="artist.name"
        :listeners="artist.listeners"
        v-lazy-load
      />
    </TransitionGroup>
  </section>
</template>
<script setup>
import useFavouriteContent from '@/composables/useFavouriteContent'
import Artist from './Artist.vue'

const { favouriteItems } = useFavouriteContent('artists')
</script>

<style lang="scss" scoped>
.artists {
  &__body {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    row-gap: 24px;
    :deep(.artist) {
      visibility: hidden;
      &.active {
        animation: show-favourite linear 0.3s forwards;
      }
    }
  }
}
</style>
