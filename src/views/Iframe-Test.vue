<template>
  <iframe
    src="https://html5.mail.10086.cn/html/restructure/index.html#/assistant/index?sid=00c0Nzg4NTQzNDAwMTkxMjI305BE07F7000001"
    frameborder="0"
  ></iframe>
</template>

<script>
export default {
  name: 'AI',
  beforeRouteEnter(to, from, next) {
    document.title = 'AI'
    next()
  },
}
</script>
<style lang="less" scoped>
iframe {
  width: 100%;
  height: 100vh;
  border: none;
  padding: 0;
  margin: 0;
}
</style>
