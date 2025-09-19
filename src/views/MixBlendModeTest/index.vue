<template>
  <div class="multi-cover">
    <div class="phone-swipe" :style="{ background: value }">
      <input type="color" v-model="value" />
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
export default {
  data() {
    return {
      value: '#ffffff',
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
