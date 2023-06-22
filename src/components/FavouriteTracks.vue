<template>
  <main class="main">
    <section class="tracks">
      <h2>Favourite Tracks</h2>
      <div class="table">
        <!-- <transition-group name="user-list"> </transition-group> -->
        <TableRow
          v-for="track in favouriteItems"
          :key="track.id"
          :artist="track.artist"
          :name="track.name"
          :image="track.image"
          :play="track.url"
          :listeners="track.listeners"
          v-lazy-load
        >
        </TableRow>
      </div>
    </section>
  </main>
</template>
<script setup>
import useFavouriteContent from "../composables/useFavouriteContent";
import TableRow from "./TableRow.vue";
const { favouriteItems } = useFavouriteContent("tracks");
</script>

<style lang="scss" scoped>
.main {
  .tracks {
    h2 {
      font-size: 24px;
      line-height: 30px;
      margin: 24px 0 0;
      font-weight: 400;
    }

    h3 {
      color: red;
    }
    .table {
      margin: 24px 0 0;
    }

    :deep(.table-row) {
      visibility: hidden;
      opacity: 0;
      &.active {
        visibility: visible;
        transition: visibility 0.3s linear, opacity 0.3s linear;
        opacity: 1;
      }
    }
  }
  :deep(.pagination) {
    margin: 20px 0 0;
  }
  // .user-list-item {
  //   display: inline-block;
  //   margin-right: 10px;
  // }
  // .user-list-enter-active,
  // .user-list-leave-active {
  //   transition: all 0.2s ease;
  // }
  // .user-list-enter-from,
  // .user-list-leave-to {
  //   opacity: 0;
  //   transform: translateX(130px);
  // }
  // .user-list-move {
  //   transition: transform 0.2s ease;
  // }
}
</style>
