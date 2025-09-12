<template>
  <transition name="fade">
    <div class="container" v-show="visible">
      <div class="nav">
        <div class="btn" @click="close">取消</div>
        <div class="btn primary" @click="confirm">确定</div>
      </div>
      <vueCropper
        class="cropper_root"
        ref="cropper"
        v-bind="option"
      ></vueCropper>
    </div>
  </transition>
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
      resolve: undefined,
      visible: false,
      option: {
        img: '',
        outputSize: 1,
        outputType: 'png',
        autoCrop: true,
        centerBox: true,
        canScale: true,
      },
    }
  },
  methods: {
    edit(img) {
      this.option.img = img
      this.visible = true
      return new Promise((resolve) => (this.resolve = resolve))
    },
    close() {
      this.visible = false
    },
    confirm() {
      this.$refs.cropper.getCropBlob((data) => {
        this.resolve(data)
        this.visible = false
      })
    },
  },
}
</script>
<style scoped lang="less">
.container {
  width: 100%;
  overflow: hidden;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  .nav {
    width: 100%;
    height: 50px;
    padding: 0 16px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    .btn {
      width: 58px;
      height: 28px;
      border-radius: 19px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      font-size: 16px;
      font-weight: 500;
      font-family: 'HarmonyOS Sans SC';
      &.primary {
        background-color: #0a59f7;
      }
    }
  }
  .cropper_root {
    /deep/ .cropper-box {
      background-color: #000;
    }
    /deep/ .crop-point {
      opacity: 0;
    }
    /deep/ .cropper-view-box {
      outline-color: white;
    }
  }
}
</style>
