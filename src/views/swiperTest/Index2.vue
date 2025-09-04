<template>
  <div>
    <swiper ref="swiper">
      <swiper-slide>
        <iframe src="./index3.html" border="none"></iframe>
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
  data() {
    return {}
  },
  created() {
    window.changeIframeEvent = () => {
      this.$refs.swiper.swiper.slideNext()
    }
    window.addEventListener('message', this.onmessage)
  },
  beforeDestroy() {
    window.removeEventListener('message', this.onmessage)
  },
  methods: {
    onmessage(res) {
      if (res.data.source !== 'find-sub') return
      this.no_event = res.data.payload
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
