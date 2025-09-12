<template>
  <div>
    <button @click="onclickHandler">select</button>
    <SelectImagePopup ref="SelectImagePopup"></SelectImagePopup>
  </div>
</template>
<script>
import SelectImagePopup from '@/components/SelectImagePopup.vue'
export default {
  name: 'cropperjsTest',
  components: { SelectImagePopup },
  methods: {
    async onclickHandler() {
      try {
        const file = await this.$refs.SelectImagePopup.select()
        const blob = await this.$EditImage(URL.createObjectURL(file))
        window.open(URL.createObjectURL(blob))
      } catch (error) {
        console.log(error.message)
      }
    },
  },
}
</script>
<style lang="less" scoped></style>
