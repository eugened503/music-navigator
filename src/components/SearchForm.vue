<template>
  <form @submit.prevent="search(currentRequest)" class="form">
    <input
      id="site-search"
      class="form__field"
      type="text"
      placeholder="Search for music…"
      v-model="currentRequest"
    />
    <button class="form__reset" type="reset"></button>
    <span>|</span>
    <button
      :disabled="!currentRequest"
      class="form__submit"
      type="submit"
    ></button>
  </form>
</template>
<script setup>
import { computed } from "vue";
import { useStoreAPI } from "../stores/storeAPI";
const { trackSearch, albumSearch, artistSearch, $state, getCurrentRequest } =
  useStoreAPI();

const props = defineProps({
  requestName: String,
});

const currentRequest = computed({
  get: () => $state.currentRequest,
  set: (val) => getCurrentRequest(val),
});

const search = (currentRequest) => {
  switch (props.requestName) {
    case "track":
      trackSearch(currentRequest);
      break;
    case "album":
      albumSearch(currentRequest);
      break;
    case "artist":
      artistSearch(currentRequest);
      break;
    default:
      console.log("Неизвестное значение");
  }
};
</script>

<style lang="scss" scoped>
.form {
  position: relative;

  span {
    display: block;
    position: absolute;
    top: 8px;
    right: 38px;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 100%;
    position: absolute;
    top: 0;
  }

  &__field {
    padding-right: 80px;
  }

  &__reset {
    right: 40px;
    background-image: url(../assets/images/edit_clear.svg);
    background-repeat: no-repeat;
    background-size: 33%;
    background-position: center;
  }

  &__submit {
    right: 0;
    background-image: url(../assets/images/search.svg);
    background-repeat: no-repeat;
    background-size: 50%;
    background-position: center;
  }
}
</style>
