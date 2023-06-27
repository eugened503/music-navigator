<template>
  <section class="albums">
    <h1>Favourite Albums</h1>
    <div class="albums__body">
      <Album
        v-for="album in favouriteItems"
        :key="album.id"
        :play="album.url"
        :image="album.image"
        :name="album.name"
        :artist="album.artist"
        v-lazy-load
      />
    </div>
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
    margin: 24px 0 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 24px;
    :deep(.album) {
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
