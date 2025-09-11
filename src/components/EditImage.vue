<template>
  <div class="cropper">
    <vueCropper ref="cropper" v-bind="option"></vueCropper>
  </div>
</template>
<script>
// @see:https://www.npmjs.com/package/vue-cropper/v/0.4.7
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper,
  },
  data() {
    return {
      option: {
        img: require('@/assets/img/bizhi/01.png'),
        outputSize: 1,
        outputType: 'png',
        autoCrop: true,
        centerBox: true,
        infoTrue: true,
      },
    }
  },
}
</script>
<style scoped lang="less">
.cropper {
  height: 100vh;
}
</style>
