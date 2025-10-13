<template>
  <div>
    my
    <button @click="onclickHandler">select</button>
    <SelectImagePopup ref="SelectImagePopup"></SelectImagePopup>
    <EditImage2 ref="EditImage2"></EditImage2>
  </div>
</template>
<script>
import EditImage2 from '@/components/EditImage2.vue'
import SelectImagePopup from '@/components/SelectImagePopup.vue'
export default {
  name: 'cropperjsTest',
  components: { SelectImagePopup, EditImage2 },
  methods: {
    async onclickHandler() {
      try {
        const file = await this.$refs.SelectImagePopup.select()
        const blob = await this.$refs.EditImage2.edit(URL.createObjectURL(file))
        window.open(URL.createObjectURL(blob))
      } catch (error) {
        console.log(error.message)
      }
    },
  },
}
</script>
<style lang="less" scoped></style>
