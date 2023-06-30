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
    <h2 v-if="getTrackLoaded && getTracks.length === 0 && !getError">No tracks found</h2>
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
import Track from "./Track.vue";
import SearchForm from "../components/SearchForm.vue";
import Pagination from "../components/Pagination.vue";
import Loader from "../components/Loader.vue";
import { useStoreAPI } from "../stores/storeAPI";
import useUserPagination from "../composables/useUserPagination";
import { storeToRefs } from "pinia";

const {
  getTracks,
  getTrackLoaded,
  getError,
  getCurrentRequest,
  getTrackRequest,
  getLoaded
} = storeToRefs(useStoreAPI());

const { trackSearch } = useStoreAPI();

const { displayedItems, pages, page, getPageNumber, getNextPage, getPrevPage } =
  useUserPagination(getTracks, "tracks");

onMounted(() => {
  if (getCurrentRequest.value && getCurrentRequest.value !== getTrackRequest.value) {
    trackSearch(getCurrentRequest.value);
  }
});
</script>

<style lang="scss" scoped>
.tracks {
  animation: show 0.7s forwards;
  min-height: 302px;
  @media screen and (max-width: $tablet) {
    min-height: 318px;
  }
}
</style>
