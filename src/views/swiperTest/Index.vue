<template>
  <swiper ref="swiper" @swiperChange="onSwiperChange">
    <swiper-slide>
      <iframe src="./index2.html" border="none"></iframe>
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
  methods: {
    onSwiperChange() {},
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
  //   pointer-events: none;
  &::--webkit-scrollbar {
    display: none;
  }
}
</style>
