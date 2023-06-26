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
  .container {
    width: calc(800 / 1260 * 100%);
    padding: 24px;
    margin: 0 auto;
    :deep(.main .form) {
      margin: 20px 0 0;
    }
  }
}
</style>
