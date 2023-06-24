<template>
  <section>
    <SearchForm requestName="artist" />
    <div class="artists">
      <h2>Artists</h2>
      <div class="results">
        <Artist
          v-for="(artist, index) in displayedItems"
          :key="index"
          :play="artist.url"
          :image="artist.image[2]"
          :name="artist.name"
          :listeners="artist.listeners"        
        
        />
      </div>
    </div>
    <Pagination
      @paginationClick="getPageNumber"
      @nextPage="getNextPage"
      @prevPage="getPrevPage"
      :pages="pages"
      :page="page"
    />
    <h3 v-if="artistLoaded && artists.length === 0 && !error">
      No artists found
    </h3>
    <h3 v-if="error">{{ error }}</h3>
  </section>
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
  }
}
</style>
