<template>
  <SearchForm requestName="album" />
  <section class="albums">
    <h1>Albums</h1>
    <div class="albums__body body">
      <Album
        v-for="(album, index) in displayedItems"
        :key="index"
        :play="album.url"
        :image="album.image[3]"
        :name="album.name"
        :artist="album.artist"
      />
    </div>
    <h2 v-if="getAlbumLoaded && getAlbums.length === 0 && !getError">
      No albums found
    </h2>
    <h2 v-if="getError">{{ getError }}</h2>
  </section>
  <Pagination
    @paginationClick="getPageNumber"
    @nextPage="getNextPage"
    @prevPage="getPrevPage"
    :pages="pages"
    :page="page"
  />
  <Loader v-if="getLoaded"></Loader>
</template>
<script setup>
import { onMounted } from "vue";
import SearchForm from "../components/SearchForm.vue";
import Album from "../components/Album.vue";
import { useStoreAPI } from "../stores/storeAPI";
import Pagination from "../components/Pagination.vue";
import Loader from "../components/Loader.vue";
import useUserPagination from "../composables/useUserPagination";
import { storeToRefs } from "pinia";

const {
  getAlbums,
  getAlbumLoaded,
  getError,
  getCurrentRequest,
  getAlbumRequest,
  getLoaded,
} = storeToRefs(useStoreAPI());

const { albumSearch } = useStoreAPI();

const { displayedItems, pages, page, getPageNumber, getNextPage, getPrevPage } =
  useUserPagination(getAlbums, "albums");

onMounted(() => {
  if (
    getCurrentRequest.value &&
    getCurrentRequest.value !== getAlbumRequest.value
  ) {
    albumSearch(getCurrentRequest.value);
  }
});
</script>

<style lang="scss" scoped>
.albums {
  animation: show 0.7s forwards;
  &__body {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    @media screen and (max-width: $laptop-small) {
      grid-template-columns: 1fr 1fr;
    }
    @media screen and (max-width: $mobile) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
