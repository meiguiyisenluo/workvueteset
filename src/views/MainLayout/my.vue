<template>
  <div class="my-view">
    <button @click="changeAvatar">select</button>
    <SelectImagePopup ref="SelectImagePopup"></SelectImagePopup>
    <EditImage ref="EditImage"></EditImage>
  </div>
</template>
<script>
import EditImage from '@/components/EditImage.vue'
import SelectImagePopup from '@/components/SelectImagePopup.vue'
export default {
  name: 'my',
  components: { SelectImagePopup, EditImage },
  methods: {
    async changeAvatar() {
      const file = await this.$refs.SelectImagePopup.select()
      const url = URL.createObjectURL(file)
      console.log('url', url)
      const blob = await this.$refs.EditImage.edit(url)
      URL.revokeObjectURL(url)
      const url2 = URL.createObjectURL(blob)
      console.log('url2', url2)
      window.open(url2)
    },
  },
  created() {
    console.log('lystest', 'my', 'created')
  },
  activated() {
    console.log('lystest', 'my', 'activated')
  },
  deactivated() {
    console.log('lystest', 'my', 'deactivated')
  },
}
</script>
<style lang="less" scoped>
.my-view {
  transform: scale(1);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.3rem;
}
</style>
