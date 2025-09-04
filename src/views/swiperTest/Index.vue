<template>
  <div>
    <swiper ref="swiper" @transitionEnd="no_event = false">
      <swiper-slide>
        <iframe
          ref="iframe"
          src="/#/cloudfind"
          border="none"
          :class="{ no_event }"
        ></iframe>
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
    return {
      no_event: false,
    }
  },
  created() {
    window.addEventListener('message', this.onMessage)
  },
  beforeDestory() {
    window.removeEventListener('message', this.onMessage)
  },
  methods: {
    onMessage(e) {
      const { source = '', type = '', payload = false } = e.data || {}
      if (source !== 'sub-find') return
      if (type === 'changeIframeEvent') this.no_event = payload
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
  pointer-events: auto;
  &::--webkit-scrollbar {
    display: none;
  }
  &.no_event {
    pointer-events: none;
  }
}
</style>
