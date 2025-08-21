<template>
  <div>cloudphone</div>
</template>
<script>
export default {
  name: 'cloudphone',
  created() {
    console.log('lystest', 'cloudphone', 'created')
  },
  activated() {
    console.log('lystest', 'cloudphone', 'activated')
  },
  deactivated() {
    console.log('lystest', 'cloudphone', 'deactivated')
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
