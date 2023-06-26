<template>
  <main class="main">
    <SearchForm requestName="track" />

    <section class="tracks">
      <h2>Tracks</h2>
      <div class="table">
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
      <h3 v-if="trackLoaded && tracks.length === 0 && !error">
        No tracks found
      </h3>
      <h3 v-if="error">{{ error }}</h3>
    </section>
    <Pagination
      @paginationClick="getPageNumber"
      @nextPage="getNextPage"
      @prevPage="getPrevPage"
      :pages="pages"
      :page="page"
    />
  </main>
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
.main {
  .tracks {
    min-height: 302px;
    h2 {
      font-size: 24px;
      line-height: 30px;
      margin: 24px 0 0;
      font-weight: 400;
    }

    h3 {
      color: red;
    }
    .table {
      margin: 24px 0 0;
    }
  }
  :deep(.pagination) {
    margin: 20px 0 0;
  }
}
</style>
