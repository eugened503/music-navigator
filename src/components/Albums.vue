<template>
  <section>
    <SearchForm requestName="album" />
    <div class="albums">
      <h2>Albums</h2>
      <div class="results">
        <Album
          v-for="(album, index) in displayedItems"
          :key="index"
          :play="album.url"
          :image="album.image[2]"
          :name="album.name"
          :artist="album.artist"        
        
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
    <h3 v-if="albumLoaded && albums.length === 0 && !error">No albums found</h3>
    <h3 v-if="error">{{ error }}</h3>
  </section>
</template>
<script setup>
import { computed, onMounted } from "vue";
import SearchForm from "../components/SearchForm.vue";
import Album from "../components/Album.vue";
import { useStoreAPI } from "../stores/storeAPI";
import Pagination from "../components/Pagination.vue";
import useUserPagination from "../composables/useUserPagination";

const { $state, albumSearch } = useStoreAPI();
const currentRequest = computed(() => $state.currentRequest);
const albumRequest = computed(() => $state.albumRequest);
const albums = computed(() => $state.albums);
const error = computed(() => $state.error);
const albumLoaded = computed(() => $state.albumLoaded);

const { displayedItems, pages, page, getPageNumber, getNextPage, getPrevPage } =
  useUserPagination(albums, "albums");

onMounted(() => {
  if (currentRequest.value && currentRequest.value !== albumRequest.value) {
    albumSearch(currentRequest.value);
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
  }
}
</style>
