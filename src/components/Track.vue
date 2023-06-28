<template>
  <a :href="play" target="_blank" class="track">
    <div class="track__cell play"></div>
    <div class="track__cell image">
      <img :src="isImage" alt="image" />
    </div>
    <button
      @click.stop.prevent="
        handleItems({
          artist,
          name,
          image,
          play,
          listeners,
        })
      "
      class="track__cell loved"
      :class="{ active: lovedItems(name) }"
    ></button>

    <div class="track__cell name">
      <p class="ellipsis">{{ name }}</p>
      <p class="tablet ellipsis">{{ artist }}</p>
    </div>
    <div class="track__cell artist desktop">
      <p class="ellipsis">{{ artist }}</p>
    </div>
    <div class="track__cell listeners">
      <p class="ellipsis">{{ listeners }}</p>
    </div>
  </a>
</template>
<script setup>
import { toRef } from "vue";
import { useStoreMusic } from "../stores/storeMusic";
import useUserContent from "../composables/useUserContent";

const props = defineProps({
  artist: String,
  name: String,
  image: Object,
  play: String,
  listeners: String,
});
const imgRef = toRef(props, "image");
const { addTracks, deleteTracks } = useStoreMusic();

const { lovedItems, handleItems, isImage } = useUserContent(
  "tracks",
  addTracks,
  deleteTracks,
  imgRef
);
</script>

<style lang="scss" scoped>
.track {
  display: grid;
  grid-template-columns:
    40px 40px 40px calc(319 / 800 * 100%) calc(213 / 800 * 100%)
    minmax(120px, 350px);
  padding: 15px 0;
  @media screen and (max-width: $tablet) {
    grid-template-columns:
      40px 40px 40px 37%
      minmax(40px, 350px);
  }

  &__cell {
    &.play {
      padding-left: 0;
      margin-top: 0;
      background-color: hsla(0, 0%, 100%, 0.85);
      background-image: url(../assets/images/play.svg);
      background-size: 50%;
      background-position: 61% center;
      background-repeat: no-repeat;
      border-radius: 100%;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.07);
      height: 32px;
      width: 32px;
      transition: background-color 0.1s;
    }
    &.image {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 32px;
      width: 32px;

      img {
        width: 100%;
      }
    }
    &.loved {
      margin: auto;
      height: 20px;
      width: 20px;
      background-image: url(../assets/images/heart.svg);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      &.active {
        background-image: url(../assets/images/heart_love.svg);
      }
    }
    &.name {
      display: flex;
      align-items: center;
      @media screen and (max-width: $tablet) {
        display: block;
      }
      p {
        text-align: left;
        font-size: 14px;
        font-weight: 700;
        &.tablet {
          display: none;
          @media screen and (max-width: $tablet) {
            display: block;
            font-weight: 400;
            opacity: 0.8;
          }
        }
      }
    }
    &.artist {
      display: flex;
      align-items: center;
      p {
        text-align: left;
        font-weight: 400;
        opacity: 0.8;
        padding: 0 0 0 5px;
      }
      &.desktop {
        @media screen and (max-width: $tablet) {
          display: none;
        }
      }
    }
    &.listeners {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      p {
        font-weight: 400;
        opacity: 0.8;
        padding: 0 0 0 5px;
      }
    }
  }
}
</style>
