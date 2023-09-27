<template>
  <a :href="play" target="_blank" class="artist">
    <img class="artist__image" :src="isImage" alt="image" />
    <button
      @click.stop.prevent="
        handleItems({
          listeners,
          name,
          image,
          play
        })
      "
      class="artist__image loved"
      :class="{ active: lovedItems(name) }"
    ></button>
    <div class="artist__info">
      <p class="artist__name ellipsis">{{ name }}</p>
      <p class="ellipsis">{{ listeners }}<span> listeners</span></p>
    </div>
  </a>
</template>
<script setup>
import { toRef } from 'vue'
import { useStoreMusic } from '../stores/storeMusic'
import useUserContent from '../composables/useUserContent'
const props = defineProps({
  play: String,
  image: Object,
  name: String,
  listeners: String
})
const imgRef = toRef(props, 'image')
const { addArtists, deleteArtists } = useStoreMusic()
const { lovedItems, handleItems, isImage } = useUserContent(
  'artists',
  addArtists,
  deleteArtists,
  imgRef
)
</script>

<style lang="scss" scoped>
.artist {
  display: grid;
  grid-template-columns: 70px calc(100% - 90px);
  gap: 15px;
  position: relative;
  @media screen and (max-width: $tablet) {
    display: block;
  }

  &__image {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    &.loved {
      position: absolute;
      top: 0;
      left: 47px;
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
    font-size: 14px;
    line-height: 24px;
    padding: 0 5px 0 0;
  }

  &__name {
    font-weight: 700;
  }
}
</style>
