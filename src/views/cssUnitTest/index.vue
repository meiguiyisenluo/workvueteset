<template>
  <div class="list" :style="{ height: viewHeight }">
    <div class="item" v-for="item in 20" :key="item">{{ item * 5 }}%</div>
    <div class="viewHeight">{{ viewHeight }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      viewHeight: '100dvh',
    }
  },
  created() {
    this.supportIframeHeight()
  },
  methods: {
    supportIframeHeight() {
      if (CSS.supports?.('height', '1dvh')) return //ios 15.4+ 直接退出
      const setHeight = () => {
        const viewHeight = window.innerHeight + 'px'
        console.log('cssUnitTest', viewHeight)
        this.viewHeight = viewHeight
      }
      setHeight()
      window.addEventListener('resize', setHeight)
      window.addEventListener('orientationchange', setHeight)
    },
  },
}
</script>
<style lang="less" scoped>
div.list {
  width: 100%;
  position: relative;
  div.item {
    height: 5%;
    font-size: 12px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }

  div.viewHeight {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
