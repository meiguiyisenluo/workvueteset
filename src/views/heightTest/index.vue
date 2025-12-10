<template>
  <div :style="{ height: viewHeight || '100vh' }">
    {{ viewHeight }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      viewHeight: '',
    }
  },
  created() {
    this.setHeight()
    window.addEventListener('resize', this.setHeight)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setHeight)
  },
  methods: {
    setHeight() {
      this.viewHeight = window.innerHeight + 'px'
    },
  },
}
</script>

<style scoped>
div {
  width: 100%;
  background-color: blue;
}
</style>
