<template>
  <section class="albums">
    <h1>Favourite Albums</h1>
    <TransitionGroup name="fade" tag="div" class="albums__body body">
      <Album
        v-for="album in favouriteItems"
        :key="album.id"
        :play="album.play"
        :image="album.image"
        :name="album.name"
        :artist="album.artist"
        v-lazy-load
      />
    </TransitionGroup>
  </section>
</template>
<script setup>
import Album from "../components/Album.vue";
import useFavouriteContent from "../composables/useFavouriteContent";
const { favouriteItems } = useFavouriteContent("albums");
</script>

<style lang="scss" scoped>
.albums {
  &__body {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    :deep(.album) {
      visibility: hidden;
      &.active {
        animation: show-favourite linear 0.3s forwards;
      }
    }
    @media screen and (max-width: $laptop-small) {
      grid-template-columns: 1fr 1fr;
    }
    @media screen and (max-width: $mobile) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
