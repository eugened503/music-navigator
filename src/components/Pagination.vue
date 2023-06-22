<template>
  <div class="pagination">
    <button
      class="pagination__button"
      type="button"
      v-if="page != 1"
      @click="handlePrevPage"
    >
      --
    </button>
    <button
      type="button"
      v-for="pageNumber in pages"
      :key="pageNumber"
      class="pagination__button"
      :class="{ active: pageNumber === page }"
      @click="handlePageNumber(pageNumber)"
    >
      {{ pageNumber }}
    </button>

    <button
      class="pagination__button"
      type="button"
      @click="handleNextPage"
      v-if="page < pages?.length"
    >
      ++
    </button>
  </div>
</template>
<script setup>
const props = defineProps({
  pages: Array,
  page: Number,
});

const emit = defineEmits(["paginationClick", "nextPage", "prevPage"]);
const handlePageNumber = (pageNumber) => {
  emit("paginationClick", pageNumber);
};

const handleNextPage = () => {
  emit("nextPage");
};

const handlePrevPage = () => {
  emit("prevPage");
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  gap: 5px;

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    color: white;
    background-color: blue;

    &.active {
      background-color: red;
    }
  }
}
</style>
