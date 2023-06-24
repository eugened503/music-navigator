<template>
  <a :href="play" target="_blank" class="table-row">
    <div class="table-row__cell play"></div>
    <div class="table-row__cell image">
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
      class="table-row__cell loved"
      :class="{ active: lovedItems(name) }"
    ></button>

    <div class="table-row__cell name">
      <p>{{ name }}</p>
    </div>
    <div class="table-row__cell artist">
      <p>{{ artist }}</p>
    </div>
    <div class="table-row__cell listeners">
      <p>{{ listeners }}</p>
    </div>
  </a>
</template>
<script setup>
import { computed, ref, watch, onMounted, onBeforeMount } from "vue";
import { getImage } from "../utils/getImage.js";
import { useStoreMusic } from "../stores/storeMusic";
import useUserContent from "../composables/useUserContent";

const props = defineProps({
  artist: String,
  name: String,
  image: Object,
  play: String,
  listeners: String,
});

const isImage = computed(() => getImage(props.image));
const { addTracks, deleteTracks } = useStoreMusic();

const { lovedItems, handleItems } = useUserContent(
  "tracks",
  addTracks,
  deleteTracks,
);

</script>

<style lang="scss" scoped>
.table-row {
  display: grid;
  grid-template-columns:
    40px 40px 40px calc(319 / 800 * 100%) calc(213 / 800 * 100%)
    auto;
  //display: flex;
  padding: 15px 0;
  //align-items: center;
  &__cell {
    //padding: 0 8px;
    &.play {
      padding-left: 0;
      margin-top: 0;
      background-color: hsla(0, 0%, 100%, 0.85);
      background-image: url(../assets/play.svg);
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
    &.name {
      display: flex;
      align-items: center;
      p {
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;
        line-height: 21px;
        font-weight: 700;
      }
    }
    &.artist {
      display: flex;
      align-items: center;
      p {
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 400;
        opacity: 0.8;
      }
    }
    &.listeners {
      display: flex;
      align-items: center;
      p {
        text-align: right;
        font-weight: 400;
        opacity: 0.8;
        padding-right: 0;
      }
    }
  }
}
</style>
../composables/useUserContent.js