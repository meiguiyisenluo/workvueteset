<template>
  <div>
    <!-- <van-dialog
    class="123"
    style="width: 100%"
    id="123"
    ref="dialog"
    v-model="show"
    title="标题"
    show-cancel-button
    @close="onClose"
  >
    <template #default>default</template>
    <template #title>title</template>
  </van-dialog> -->

    <van-popup
      ref="popup"
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
      >123</van-popup
    >
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.popup.close()
    }, 3000)
  },
  methods: {
    onClose() {
      alert(1)
    },
  },
}
</script>
