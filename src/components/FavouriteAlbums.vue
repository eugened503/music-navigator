<template>
  <section>
    <div class="albums">
      <h2>Favourite Albums</h2>
      <div class="results">
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
    </div>
  </section>
</template>
<script setup>
import Album from "../components/Album.vue";
import useFavouriteContent from "../composables/useFavouriteContent";
const { favouriteItems } = useFavouriteContent("albums");
</script>

<style lang="scss" scoped>
section {
  h3 {
    color: red;
  }
  .form {
    margin: 20px 0 0;
  }

  :deep(.pagination) {
    margin: 20px 0 0;
  }
}
section .albums {
  h2 {
    font-size: 24px;
    line-height: 30px;
    margin: 24px 0 0;
    font-weight: 400;
  }

  .results {
    margin: 24px 0 0;
    min-height: 268px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 24px;
    :deep(.result) {
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
