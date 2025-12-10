<template>
  <div class="container">
    <div class="lock" v-show="false"></div>
    <div class="video-wrap">
      <div class="video">2</div>
      <div class="nav"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  position: relative;
  .lock {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 101;
    background-color: green;
  }
  .video-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    // position: relative;
    // z-index: 1;
    .nav {
      width: 100%;
      height: 48px;
      background-color: red;
      position: sticky;
      z-index: 100;
      bottom: 0;
      left: 0;
    }
    .video {
      width: 100%;
      height: 100%;
      background-color: blue;
    }
  }
}
</style>
