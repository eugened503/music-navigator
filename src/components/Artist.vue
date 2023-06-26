<template>
  <a :href="play" target="_blank" class="result">
    <img class="result__image" :src="isImage" alt="image" />
    <div class="result__info">
      <p class="result__name">{{ name }}</p>
      <p class="result__listeners">{{ listeners }}<span> listeners</span></p>
    </div>
    <button
      @click.stop.prevent="
        handleItems({
          listeners,
          name,
          image,
          play,
        })
      "
      class="result__image loved"
      :class="{ active: lovedItems(name) }"
    ></button>
  </a>
</template>
<script setup>
import { toRef } from "vue";
import { useStoreMusic } from "../stores/storeMusic";
import useUserContent from "../composables/useUserContent";
const props = defineProps({
  play: String,
  image: Object,
  name: String,
  listeners: String,
});
const imgRef = toRef(props, "image");
const { addArtists, deleteArtists } = useStoreMusic();
const { lovedItems, handleItems, isImage } = useUserContent(
  "artists",
  addArtists,
  deleteArtists,
  imgRef
);
</script>

<style lang="scss" scoped>
.result {
  display: flex;
  gap: 15px;

  &__image {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    &.loved {
      height: 32px;
      width: 32px;
      background-image: url(../assets/heart.svg);
      background-size: 24px 24px;
      background-repeat: no-repeat;
      background-position: center;

      &.active {
        background-color: chartreuse;
      }
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__name {
    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
  }

  &__listeners {
    font-size: 14px;
    line-height: 24px;
  }
}
</style>
../composables/useUserContentOld.js
