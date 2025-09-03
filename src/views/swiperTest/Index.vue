<template>
  <swiper ref="swiper" @transitionEnd="transitionEnd">
    <swiper-slide>
      <iframe src="./index2.html" border="none" :class="{ no_event }"></iframe>
    </swiper-slide>
    <swiper-slide>
      <div class="screen">首页</div>
    </swiper-slide>
    <swiper-slide>
      <div class="screen">我的</div>
    </swiper-slide>
  </swiper>
</template>

<script>
export default {
  data() {
    return {
      no_event: false,
    }
  },
  created() {
    window.changeIframeEvent = (e) => {
      this.no_event = e
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
      console.log(this.no_event)
    },
    transitionEnd() {
      this.no_event = false
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
  &.no_event {
    pointer-events: none;
  }
}
</style>
