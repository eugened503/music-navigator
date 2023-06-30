<template>
  <SearchForm requestName="artist" />
  <section class="artists">
    <h1>Artists</h1>
    <div class="artists__body body">
      <Artist
        v-for="(artist, index) in displayedItems"
        :key="index"
        :play="artist.url"
        :image="artist.image[2]"
        :name="artist.name"
        :listeners="artist.listeners"
      />
    </div>
    <h2 v-if="getArtistLoaded && getArtists.length === 0 && !getError">
      No artists found
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
import Artist from "../components/Artist.vue";
import { useStoreAPI } from "../stores/storeAPI";
import Pagination from "../components/Pagination.vue";
import Loader from "../components/Loader.vue";
import useUserPagination from "../composables/useUserPagination";
import { storeToRefs } from "pinia";

const {
  getArtists,
  getArtistLoaded,
  getError,
  getCurrentRequest,
  getArtistRequest,
  getLoaded,
} = storeToRefs(useStoreAPI());

const { artistSearch } = useStoreAPI();

const { displayedItems, pages, page, getPageNumber, getNextPage, getPrevPage } =
  useUserPagination(getArtists, "artists");

onMounted(() => {
  if (getCurrentRequest.value && getCurrentRequest.value !== getArtistRequest.value) {
    artistSearch(getCurrentRequest.value);
  }
});
</script>

<style lang="scss" scoped>
.artists {
  animation: show 0.7s forwards;
  &__body {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    row-gap: 24px;
  }
}
</style>
