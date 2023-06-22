<template>
  <div class="search">
    <div class="header">
      <div class="container">
        <SearchNav />
      </div>
    </div>
  </div>
</template>
<script setup>
import SearchNav from "../components/SearchNav.vue";
</script>

<style lang="scss" scoped>
.search {
  .container {
    width: calc(800 / 1260 * 100%);
    padding: 24px;
    margin: 0 auto;
    :deep(.main .form) {
      margin: 20px 0 0;
    }
  }
}
.search .header {
  display: flex;
  justify-content: center;
  align-items: center;
  //border-bottom: 1px solid #d7d7d7;
  h1 {
    font-size: 30px;
    letter-spacing: -0.4px;
    line-height: 36px;
    margin: 0 0 20px;
    text-align: left;
  }
}
</style>
