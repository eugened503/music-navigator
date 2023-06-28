<template>
  <SearchForm requestName="track" />
  <section class="tracks">
    <h1>Tracks</h1>
    <div class="body">
      <Track
        v-for="(track, index) in displayedItems"
        :key="index"
        :artist="track.artist"
        :name="track.name"
        :image="track.image[0]"
        :play="track.url"
        :listeners="track.listeners"
      >
      </Track>
    </div>
    <h2 v-if="trackLoaded && tracks.length === 0 && !error">No tracks found</h2>
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
import Track from "./Track.vue";
import SearchForm from "../components/SearchForm.vue";
import Pagination from "../components/Pagination.vue";
import { useStoreAPI } from "../stores/storeAPI";
import useUserPagination from "../composables/useUserPagination";

const { $state, trackSearch } = useStoreAPI();
const tracks = computed(() => $state.tracks);
const trackLoaded = computed(() => $state.trackLoaded);
const error = computed(() => $state.error);
const currentRequest = computed(() => $state.currentRequest);
const trackRequest = computed(() => $state.trackRequest);

const { displayedItems, pages, page, getPageNumber, getNextPage, getPrevPage } =
  useUserPagination(tracks, "tracks");

onMounted(() => {
  if (currentRequest.value && currentRequest.value !== trackRequest.value) {
    trackSearch(currentRequest.value);
  }
});
</script>

<style lang="scss" scoped>
.tracks {
  min-height: 302px;
  @media screen and (max-width: $tablet) {
    min-height: 318px;
  }
}
</style>
