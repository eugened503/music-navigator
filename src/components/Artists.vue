<template>
  <SearchForm requestName="artist" />
  <section class="artists">
    <h1>Artists</h1>
    <div class="artists__body">
      <Artist
        v-for="(artist, index) in displayedItems"
        :key="index"
        :play="artist.url"
        :image="artist.image[2]"
        :name="artist.name"
        :listeners="artist.listeners"
      />
    </div>
    <h2 v-if="artistLoaded && artists.length === 0 && !error">
      No artists found
    </h2>
    <h2 v-if="error">{{ error }}</h2>
  </section>
  <Pagination
    @paginationClick="getPageNumber"
    @nextPage="getNextPage"
    @prevPage="getPrevPage"
    :pages="pages"
    :page="page"
  />
</template>
<script setup>
import { computed, onMounted } from "vue";
import SearchForm from "../components/SearchForm.vue";
import Artist from "../components/Artist.vue";
import { useStoreAPI } from "../stores/storeAPI";
import Pagination from "../components/Pagination.vue";
import useUserPagination from "../composables/useUserPagination";

const { $state, artistSearch } = useStoreAPI();
const currentRequest = computed(() => $state.currentRequest);
const artistRequest = computed(() => $state.artistRequest);
const artists = computed(() => $state.artists);
const error = computed(() => $state.error);
const artistLoaded = computed(() => $state.artistLoaded);

const { displayedItems, pages, page, getPageNumber, getNextPage, getPrevPage } =
  useUserPagination(artists, "artists");

onMounted(() => {
  if (currentRequest.value && currentRequest.value !== artistRequest.value) {
    artistSearch(currentRequest.value);
  }
});
</script>

<style lang="scss" scoped>
.artists {
  &__body {
    margin: 24px 0 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 24px;
  }
}
</style>
