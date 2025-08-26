<template>
  <div class="container">
    <h2>请调节背景色{{ value }}</h2>
    <input type="color" v-model="value" />
    <div
      class="bg"
      :style="{
        backgroundColor: value,
      }"
    >
      <div class="swpier-indicator-wrapper">
        <div class="swpier-indicator">
          <span class="swpier-indicator-item"></span>
          <span class="swpier-indicator-item active"></span>
          <span class="swpier-indicator-item"></span>
        </div>
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
export default {
  data() {
    return {
      value: '#000',
    }
  },
}
</script>
<style scoped lang="less">
.container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .bg {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .position {
    position: absolute;
    bottom: 100px;
  }

  .swpier-indicator-wrapper {
    height: 0;
    width: 100%;
    display: flex;
    justify-content: center;

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
      height: 6px;
      opacity: 0.9;
      background: #ffffff;
      border-radius: 3px;
    }
  }
}
</style>
