<template>
  <div class="pagination">
    <button class="pagination__button" type="button" v-if="page != 1" @click="handlePrevPage">
      «
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
      »
    </button>
  </div>
</template>
<script setup lang="ts">
interface Props {
  pages: number[]
  page: number
}

defineProps<Props>()

const emit = defineEmits(['paginationClick', 'nextPage', 'prevPage'])

const handlePageNumber = (pageNumber: number): void => {
  emit('paginationClick', pageNumber)
}

const handleNextPage = (): void => {
  emit('nextPage')
}

const handlePrevPage = (): void => {
  emit('prevPage')
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  gap: 5px;

  &__button {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 34px;
    height: 24px;
    border: 1px solid $clr-smog;
    transition: background-color 0.3s;
    &:hover:not(.active) {
      background-color: $clr-gray;
    }
    &.active {
      background-color: $clr-carrot;
    }
  }
}
</style>
