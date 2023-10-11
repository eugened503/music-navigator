import { computed, watch, ComputedRef } from 'vue'
import { useStorePagination } from '@stores/storePagination'
import { LastFmItem } from '@/types/lastFmTypes'

export default function useUserPagination(
  currentItems: ComputedRef<LastFmItem[]>,
  pageName: string
) {
  const store = useStorePagination()
  const page = computed(() => store.getPage(pageName))
  const perPage = computed(() => store.getPerPage(pageName))
  const pages = computed(() => store.getPages(pageName))

  const paginate = (items: LastFmItem[]) => {
    const pageValue = page.value
    const perPageValue = perPage.value
    const from = pageValue * perPageValue - perPageValue
    const to = pageValue * perPageValue
    return items?.slice(from, to)
  }

  const displayedItems = computed(() => paginate(currentItems.value))

  const setPages = () => {
    store.resetPage(pageName)
    store.clearPages(pageName)
    const numberOfPages = Math.ceil(currentItems.value?.length / perPage.value)
    for (let index = 1; index <= numberOfPages; index++) {
      store.addPages(pageName, index)
    }
  }

  const getPageNumber = (pageNumber: number) => {
    store.getPageNumber(pageNumber, pageName)
  }

  const getNextPage = () => {
    store.getNextPage(pageName)
  }

  const getPrevPage = () => {
    store.getPrevPage(pageName)
  }

  watch(currentItems, setPages)

  return {
    displayedItems,
    pages,
    page,
    getPageNumber,
    getNextPage,
    getPrevPage,
    setPages
  }
}
