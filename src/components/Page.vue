<template>
  <main class="main">
    <div class="container">
      <SearchNav />
    </div>
  </main>
</template>
<script setup>
import SearchNav from "./SearchNav.vue";
</script>

<style lang="scss" scoped>
.main {
  margin: 69px 0 0;
  min-height: 100vh;
  .container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: calc(800 / 1260 * 100%);
    padding: 24px;
    margin: 0 auto;
    @media screen and (max-width: $desktop) {
      width: 1219px;
    }
    @media screen and (max-width: $laptop) {
      width: 100%;
    }
    @media screen and (max-width: $tablet) {
      padding: 24px 10px;
    }
  }
}
</style>
