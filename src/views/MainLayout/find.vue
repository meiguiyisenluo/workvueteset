<template>
  <div>find</div>
</template>
<script>
export default {
  name: 'find',
  created() {
    console.log('lystest', 'find', 'created')
  },
  activated() {
    console.log('lystest', 'find', 'activated')
  },
  deactivated() {
    console.log('lystest', 'find', 'deactivated')
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
