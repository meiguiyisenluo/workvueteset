<template>
  <div class="container">
    <div class="wrap">
      <div class="iframe" :style="{ height: viewHeight || '100vh' }">
        {{ viewHeight }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      viewHeight: '',
    }
  },
  created() {
    this.setHeight()
    window.addEventListener('resize', this.setHeight)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setHeight)
  },
  methods: {
    setHeight() {
      this.viewHeight = window.innerHeight + 'px'
    },
  },
}
</script>

<style lang="less" scoped>
div.container {
  width: 100%;
  min-height: 100vh;
  background-image: url('https://obs-wx-ysj-xnl-test-001.obs.dualstack.cidc-rp-12.joint.cmecloud.cn/public/user/phone/screenshot/yn_d62e8cej.png');
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 100% 100%;
  .wrap {
    width: 100%;
    height: 100vh;
    .iframe {
      width: 100%;
      background-color: blue;
    }
  }
}
</style>
