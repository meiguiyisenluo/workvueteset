<template>
  <video :src="src" style="width: 100%"></video>
</template>
<script>
export default {
  name: 'videoFirstFrameTest',
  data() {
    return {
      src: '',
    }
  },
  created() {
    this.src = 'https://test.r2.1591420.xyz/video/02.mp4'
    document.querySelector('video').currentTime = 0
  },
}
</script>
