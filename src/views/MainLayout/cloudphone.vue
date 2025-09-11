<template>
  <div>
    假装是活动页
    <button @click="jumpto">jumpto</button>
    <button @click="show1 = true">show1</button>
    <button @click="show2 = true">show2</button>
    <van-dialog
      class="123"
      style="width: 100%"
      id="123"
      ref="dialog"
      v-model="show1"
      title="标题"
      show-cancel-button
      @close="onClose"
    >
      <template #default>default</template>
      <template #title>title</template>
    </van-dialog>

    <van-popup
      ref="popup"
      v-model="show2"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
      >123</van-popup
    >
  </div>
</template>
<script>
export default {
  name: 'cloudphone',

  data() {
    return {
      show1: false,
      show2: false,
    }
  },
  mounted() {
    setTimeout(() => {
      // this.$refs.popup.close()
    }, 3000)
  },
  methods: {
    jumpto() {
      // const host1 = 'https://plus.buy.139.com/hwh5-cchwytest'
      const host2 = 'https://192.168.0.9:8000'
      const token = 'YZsidssolg1bdd75ebb1dec98f7a5ada360a969716'
      window.location.href = `${host2}/#/cloudphone?token=${token}&loginType=0&activityUrl=https%3A%2F%2Fmail.10086.cn%2Fs%3Ffunc%3Dlogin%3AauthTokenPE%26clientId%3D10110%26token%3D%7B%7BssoTk%7D%7D%26targetSourceId%3D001003%26loginSuccessUrl%3Dhttps%3A%2F%2Fhtml5.mail.10086.cn%2Fhtml%2Frestructure%2Findex.html%23%2Fassistant%3FclientId%3D10110%26channelid%3D900529%26token%3D%7B%7BssoTk%7D%7D%26channelSrc%3Dred-cloudphone-003`
    },
    onClose() {
      alert(1)
    },
  },
  created() {
    console.log('lystest', 'cloudphone', 'created')
  },
  activated() {
    console.log('lystest', 'cloudphone', 'activated')
  },
  deactivated() {
    console.log('lystest', 'cloudphone', 'deactivated')
  },
}
</script>
<style lang="less" scoped></style>
