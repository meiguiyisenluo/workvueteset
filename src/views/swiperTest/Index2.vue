<template>
  <div>
    <swiper ref="swiper">
      <swiper-slide>
        <iframe src="/#/cloudfind" border="none"></iframe>
      </swiper-slide>
      <swiper-slide>
        <div class="screen">首页</div>
      </swiper-slide>
      <swiper-slide>
        <div class="screen">我的</div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
export default {
  created() {
    window.addEventListener('message', this.onMessage)
  },
  beforeDestory() {
    window.removeEventListener('message', this.onMessage)
  },
  methods: {
    onMessage(e) {
      const { source = '', type = '' } = e.data || {}
      if (source !== 'sub-find') return
      if (type === 'changeSlide') this.$refs.swiper.swiper.slideNext()
    },
  },
}
</script>

<style scoped lang="less">
.screen {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
iframe {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  border: none;
  &::--webkit-scrollbar {
    display: none;
  }
}
</style>
