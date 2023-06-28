<template>
  <a v-if="name !== '(null)'"  :href="play" target="_blank" class="album">
    <img class="album__image" :src="isImage" alt="image" />
    <button
      @click.stop.prevent="
        handleItems({
          artist,
          name,
          image,
          play,
        })
      "
      class="album__image loved"
      :class="{ active: lovedItems(name, artist) }"
    ></button>
    <div class="album__info">
      <p class="album__album ellipsis">{{ name }}</p>
      <p class="album__artist ellipsis">
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
const { addAlbums, deleteAlbums } = useStoreMusic();
const { lovedItems, handleItems, isImage } = useUserContent(
  "albums",
  addAlbums,
  deleteAlbums,
  imgRef
);
</script>

<style lang="scss" scoped>
.album {
  position: relative;
  &__image {
    width: 100%;
    height: auto;
    &.loved {
      position: absolute;
      top: 8px;
      right: 8px;
      height: 25px;
      width: 25px;
      background-image: url(../assets/images/heart_white.svg);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      &.active {
        background-image: url(../assets/images/heart_love.svg);
      }
    }
  }

  &__info {
    display: grid;
    grid-template-rows: 1fr 1fr;
  }

  &__album {
    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    padding-right: 5px;
  }

  &__artist {
    font-size: 14px;
    line-height: 24px;
    padding-right: 5px;
  }
}
</style>
