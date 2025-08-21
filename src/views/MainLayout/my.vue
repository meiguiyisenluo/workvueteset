<template>
  <div>my</div>
</template>
<script>
export default {
  name: 'my',
  created() {
    console.log('lystest', 'my', 'created')
  },
  activated() {
    console.log('lystest', 'my', 'activated')
  },
  deactivated() {
    console.log('lystest', 'my', 'deactivated')
  },
}
</script>
<style lang="less" scoped>
div {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
