<template>
  <Header></Header>
  <Footer></Footer>
  <Loader v-if="getLoaded"></Loader>
  <Modal :showModal="showModal" @close="closeModal">
    <template v-slot:header>
      <h2>Внимание!</h2>
    </template>
    <template v-slot:body>
      <p>{{ getErrorCode }}</p>
    </template>
  </Modal>
</template>

<script setup>
import { onBeforeMount, watch, ref } from 'vue'
import { useStoreMusic } from '@/stores/storeMusic'
import { useStoreUser } from '@/stores/storeUser'
import { storeToRefs } from 'pinia'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Loader from '@/components/Loader.vue'
import Modal from '@/components/Modal.vue'

const { fetchUser, clearErrorCode } = useStoreUser()
const { getElementId } = useStoreMusic()
const { getLoaded, getUid, getErrorCode } = storeToRefs(useStoreUser())

const showModal = ref(false)

const closeModal = () => {
  showModal.value = false
  clearErrorCode()
}

onBeforeMount(fetchUser)

watch(getUid, (newUid) => {
  if (newUid) {
    getElementId(newUid)
  }
})

watch(getLoaded, (newLoaded) => {
  if (!newLoaded && getErrorCode.value !== null) {
    showModal.value = true
  }
})
</script>
