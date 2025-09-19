<template>
  <div class="container">
    <div class="item" v-for="(item, index) in 9" :key="index">
      {{ item }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'gridTest',
}
</script>

<style lang="less" scoped>
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-auto-rows: minmax(100px, auto);
  gap: 10px;
  padding: 10px;
  .item {
    background-color: #42b983;
    color: white;
    font-size: 24px;
    display: grid;
    place-items: center;
  }
}
</style>
