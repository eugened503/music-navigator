<template>
  <a :href="play" target="_blank" class="result">
    <img class="result__image" :src="isImage" alt="image" />
    <button
      @click.stop.prevent="
        handleItems({
          artist,
          name,
          image,
          play,
        })
      "
      class="result__image loved"
      :class="{ active: lovedItems(name, artist) }"
    ></button>
    <div class="result__info">
      <p class="result__album">{{ name }}</p>
      <p class="result__artist">
        {{ artist }}
      </p>
    </div>
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
  artist: String,
});
const imgRef = toRef(props, "image");
const { addAlbums, deleteAlbums} = useStoreMusic();
const { lovedItems, handleItems, isImage } = useUserContent(
  "albums",
  addAlbums,
  deleteAlbums,
  imgRef
);
</script>

<style lang="scss" scoped>
.result {
  &__image {
    width: 70px;
    height: 70px;
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

  &__album {
    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
  }

  &__artist {
    font-size: 14px;
    line-height: 24px;
  }
}
</style>