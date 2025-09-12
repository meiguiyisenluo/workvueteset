<template>
  <div>
    <van-popup
      v-model="visible"
      position="bottom"
      :closeable="true"
      :close-on-click-overlay="false"
      class="SelectImagePopup"
      overlay-class="SelectImagePopupOverlay_dewwklsif"
    >
      <div class="header">
        <h4 class="title">更换头像</h4>
      </div>
      <div class="content">
        <div class="item" @click="showAuthDialog('album')">
          <span>从相册选择</span>
        </div>
        <div class="item" @click="fromClouddisk">
          <span>从云盘选择</span>
        </div>
        <div class="item" @click="showAuthDialog('camera')">
          <span>拍照上传</span>
        </div>
      </div>
    </van-popup>
    <van-dialog
      v-model="authDialogVisible"
      ref="albumAuthDialog"
      class="auth-dialog"
      title="权限提示"
      :message="typeMessage[type]"
      confirm-button-text="同意"
      confirm-button-color="#0A59F7"
      show-cancel-button
      cancel-button-text="取消"
      cancel-button-bolor="#191919"
      :overlay-style="{ background: 'rgba(0, 0, 0, 0.5)' }"
      close-on-click-overlay
      @confirm="selectImage"
      @cancel="authDialogVisible = false"
    >
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: 'SelectImagePopup',
  data() {
    return {
      visible: false,
      authDialogVisible: false,
      resolve: undefined,
      type: '',
      typeMessage: {
        camera: '需要获取相机权限，才能正常使用拍照上传功能',
        album: '需要获取存储权限，才能正常使用上传功能',
      },
    }
  },
  methods: {
    select() {
      this.visible = true
      return new Promise((resolve) => (this.resolve = resolve))
    },
    close() {
      this.visible = false
    },
    showAuthDialog(type) {
      this.type = type
      this.authDialogVisible = true
    },
    fromClouddisk() {
      console.log('fromClouddisk')
    },

    selectImage() {
      const typeCapture = {
        camera: 'user',
        album: '',
      }
      const input = document.createElement('input')
      input.type = 'file'
      input.capture = typeCapture[this.type]
      input.click()
      input.onchange = (e) => {
        this.visible = false
        this.resolve(e.target.files[0])
      }
    },
  },
}
</script>
<style lang="less" scoped>
.SelectImagePopup {
  width: 100%;
  height: 3.6rem;
  border-radius: 0.2rem 0.2rem 0 0;
  padding: 0 0.32rem;
  box-sizing: border-box;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h4 {
      color: #191919;
      text-align: left;
      font-size: 16px;
      font-weight: 500;
      font-family: 'HarmonyOS Sans SC';
      line-height: 20px;
    }
    img {
      width: 0.32rem;
      height: 0.32rem;
    }
  }
  .content {
    padding: 0.32rem;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    height: 1.2rem;
    .item {
      flex: 0 0 1.36rem;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 0.7rem;
        height: 0.7rem;
      }
      span {
        color: #5b5b5b;
        text-align: left;
        font-size: 12px;
        font-weight: 400;
        font-family: 'HarmonyOS Sans SC';
      }
    }
  }
}

.auth-dialog {
  top: 50%;
  transform: translate3d(0, -50%, 0);
  bottom: unset;
  left: 12px;
  right: 12px;
  width: auto;
  border-radius: 0.48rem;
  box-sizing: border-box;

  /deep/.van-dialog__header {
    font-size: 0.4rem;
  }

  /deep/.van-dialog__message {
    color: #595959;
  }

  /deep/.van-dialog__footer .van-dialog__cancel {
    border: none;
  }

  /deep/.van-dialog__footer .van-dialog__confirm {
    border: none;
    background: none;
    margin-left: 0;
  }
}
@media screen and (min-width: 475px) {
  .auth-dialog {
    width: 425px;
    left: 50%;
    transform: translate3d(-50%, -50%, 0) !important;
  }
}
</style>
<style lang="less">
.SelectImagePopupOverlay_dewwklsif {
  background-position: center 30%;
  background-size: 6rem 6rem;
  background-repeat: no-repeat;
}
</style>
