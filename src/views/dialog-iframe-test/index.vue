<template>
  <div class="iframeDemo">
    <van-dialog
      :lock-scroll="true"
      v-model="showIframe"
      :show-confirm-button="false"
      :show-cancel-button="false"
      class="iframe_dialog"
    >
      <div class="iframe_box">
        <iframe
          ref="iframe"
          width="100%"
          height="100%"
          style="border: none"
          :src="`https://cloud.139.com/#/cloudphone?token=111&loginType=0&eruda=true`"
        ></iframe>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: '',

      showIframe: true,
    }
  },

  mounted() {
    // 处理链接参数

    if (
      // 有token,就不用登录

      localStorage.getItem('activitiesUser') &&
      JSON.parse(localStorage.getItem('activitiesUser')).token
    ) {
      let activitiesUser = JSON.parse(localStorage.getItem('activitiesUser'))

      this.token = activitiesUser.token
    }

    // if (this.token) {
    //     this.tokenLogin()
    // }
  },

  methods: {
    tokenLogin() {
      let url =
        'https://cloud.139.com/#/cloudphone?token={{ssoTk}}&loginType=0&eruda=true'

      this.$api

        .post(
          '/user/getRcsToken',

          {
            token: this.token,

            targetSourceId: '001304',
          },

          {
            headers: {
              token: this.token,
            },
          }
        )

        .then(async (res) => {
          const { header, data } = res

          if (header.status === '200') {
            const token = data.token

            console.log(url)

            const newUrl = url.replace('{{ssoTk}}', token)

            console.log(newUrl)

            this.$refs.iframe.src = newUrl
          } else {
            throw new Error(header.errMsg)
          }
        })

        .catch((e) => {
          console.log(e)

          //   this.$refs.iframe.src = url
        })

      this.showIframe = true

      //   console.log(this.$refs.iframe.src)
    },
  },
}
</script>

<style lang="less" scoped>
.iframeDemo {
  height: 100vh;

  .iframe_dialog {
    width: 330px;

    height: 550px;

    background: none;

    .iframe_box,
    /deep/.van-dialog__content {
      width: 330px;

      height: 550px;

      z-index: 9999;
    }

    .iframe_box {
      position: absolute;

      top: 0;

      left: 0;
    }
  }
}
</style>
