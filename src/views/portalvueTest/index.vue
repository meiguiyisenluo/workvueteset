<template>
  <swiper
    ref="swiper"
    class="container"
    :options="swiperOptions"
    @slideChangeTransitionEnd="slideChangeTransitionEnd"
  >
    <swiper-slide>
      <find></find>
    </swiper-slide>
    <swiper-slide>
      <cloudphone></cloudphone>
    </swiper-slide>
  </swiper>
</template>

<script>
import cloudphone from './components/cloudphone.vue'
import find from './components/find.vue'
export default {
  name: 'portalvueTest',
  components: { cloudphone, find },
  data() {
    return {
      swiperOptions: {
        initalSlide: 1,
      },
    }
  },
  methods: {
    slideChangeTransitionEnd() {
      const index = this.$refs.swiper.swiper.activeIndex
      const targetPath = ['/portalvueTestFind', '/portalvueTestCloudphone'][
        index
      ]
      this.$router.push(targetPath)
    },
  },
}
</script>

<style scoped lang="less">
.container {
  height: 100vh;
  width: 100vw;
  /deep/ .swiper-wrapper {
    height: 100%;
    .swiper-slide {
      height: 100%;
    }
  }
}
</style>
