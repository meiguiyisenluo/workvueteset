<template>
  <div>
    <van-cell title-class="title" title="url">
      <textarea
        style="width: 100%; height: 100px; word-break: break-all"
        v-model="inputStr"
      />
    </van-cell>
    <van-cell title-class="title" title="base64Str">{{ base64Str }}</van-cell>
    <van-cell title-class="title" title="encodeStr">{{ encodeStr }}</van-cell>
    <van-cell title-class="title" title="decodeStr">{{ decodeStr }}</van-cell>
    <van-cell title-class="title" title="originStr">{{ originStr }}</van-cell>
  </div>
</template>

<script>
import { encode, decode } from 'url-safe-base64'
export default {
  data() {
    return {
      inputStr:
        'https://mail.10086.cn/s?func=login:authTokenPE&clientId=10110&token={{ssoTk}}&targetSourceId=001003&loginSuccessUrl=https://html5.mail.10086.cn/html/restructure/index.html#/assistant?clientId=10110&channelid=900529&token={{ssoTk}}&channelSrc=red-cloudphone-003',
    }
  },
  computed: {
    base64Str() {
      return btoa(this.inputStr)
    },
    encodeStr() {
      return encode(this.base64Str)
    },
    decodeStr() {
      return decode(this.encodeStr)
    },
    originStr() {
      return atob(this.decodeStr)
    },
  },
}
</script>
<style lang="less" scoped>
.title {
  flex: 0.1;
}
</style>
