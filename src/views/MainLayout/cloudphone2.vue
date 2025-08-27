<template>
  <div class="multi-cover">
    <div class="phone-swipe">
      <div class="phone-swipe-inner">
        <swiper :options="swiperOptions">
          <swiper-slide v-for="item in 2" :key="item">
            <phoneCover :id="item" />
          </swiper-slide>
        </swiper>
      </div>
    </div>

    <div class="swpier-indicator-wrapper position">
      <div class="swpier-indicator">
        <span class="swpier-indicator-item"></span>
        <span class="swpier-indicator-item active"></span>
        <span class="swpier-indicator-item"></span>
      </div>
    </div>
  </div>
</template>
<script>
import PhoneCover from './PhoneCover.vue'
export default {
  components: { PhoneCover },
  data() {
    return {
      swiperOptions: {
        nested: true,
      },
    }
  },
}
</script>
<style scoped lang="less">
.multi-cover {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  isolation: isolate;
  .phone-swipe {
    height: 100%;
    .phone-swipe-inner {
      height: 100%;
      /deep/ .swiper-container {
        height: 100%;
        position: static;
        .swiper-wrapper {
          position: static;
          .swiper-slide {
            position: static;
            height: 100%;
          }
        }
      }
    }
  }

  .position {
    position: relative;
    top: -95%;
  }

  .swpier-indicator-wrapper {
    height: 0;
    width: 100%;
    display: flex;
    justify-content: flex-end;

    .swpier-indicator {
      display: flex;
    }
    .swpier-indicator-item {
      will-change: transform;
      display: inline-block;
      width: 6px;
      height: 6px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 3px;
      margin: 0 3px;
      mix-blend-mode: difference;
    }
    .swpier-indicator-item.active {
      width: 18px;
      opacity: 0.9;
      background: #ffffff;
    }
  }
}
</style>
