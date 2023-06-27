<template>
  <SearchForm requestName="album" />
  <section class="albums">
    <h1>Albums</h1>
    <div class="albums__body">
      <Album
        v-for="(album, index) in displayedItems"
        :key="index"
        :play="album.url"
        :image="album.image[3]"
        :name="album.name"
        :artist="album.artist"
      />
    </div>
    <h2 v-if="albumLoaded && albums.length === 0 && !error">No albums found</h2>
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
.albums {
  &__body {
    margin: 24px 0 0;
    gap: 24px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    row-gap: 24px;
    @media screen and (max-width: $laptop-small) {
      grid-template-columns: 1fr 1fr;
    }
    @media screen and (max-width: $mobile) {
      grid-template-columns: 1fr;
    }
  }
}
</style>
