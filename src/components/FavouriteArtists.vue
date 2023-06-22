<template>
  <section>
    <div class="artists">
      <h2>Favourite Artists</h2>
      <div class="results">
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
    </div>
  </section>
</template>
<script setup>
import useFavouriteContent from "../composables/useFavouriteContent";
import Artist from "./Artist.vue";

const { favouriteItems } = useFavouriteContent("artists");
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
section .artists {
  h2 {
    font-size: 24px;
    line-height: 30px;
    margin: 24px 0 0;
    font-weight: 400;
  }

  .results {
    margin: 24px 0 0;
    min-height: 164px;
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
