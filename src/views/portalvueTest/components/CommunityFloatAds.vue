<template>
  <MountingPortal mountTo="body" name="EditImage" append slim>
    <div
      class="CommunityFloatAds"
      :style="{
        backgroundColor: color,
        left: position.x + 'px',
        top: position.y + 'px',
      }"
      @touchstart="ontouchstart"
      @mousedown="onmousedown"
    ></div>
  </MountingPortal>
</template>

<script>
export default {
  name: 'CommunityFloatAds',
  data() {
    return {
      color: '',
      position: { x: 0, y: 0 },
      dragging: false,
      offset: { x: 0, y: 0 },
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(n) {
        const map = {
          '/portalvueTestCloudphone': 'red',
          '/portalvueTestFind': 'blue',
        }
        this.color = map[n.path]
      },
    },
  },
  methods: {
    ontouchstart(e) {
      console.log('ontouchstart', 'ontouchstart' in window)
      if ('ontouchstart' in window) this.startDrag(e)
    },
    onmousedown(e) {
      console.log('onmousedown', !('ontouchstart' in window))
      if (!('ontouchstart' in window)) this.startDrag(e)
    },
    startDrag(e) {
      console.log('abc')
      e.stopPropagation()
      this.dragging = true
      document.addEventListener('touchmove', this.onDrag, {
        capture: false,
      })
      document.addEventListener('touchend', this.stopDrag, {
        capture: false,
      })
      document.addEventListener('mousemove', this.onDrag, {
        capture: false,
      })
      document.addEventListener('mouseup', this.stopDrag, {
        capture: false,
      })
    },
    onDrag(e) {
      e.stopPropagation()
      if (!this.dragging) return
      const { clientX, clientY } = e.touches ? e.touches[0] : e
      this.position.x = clientX - 50
      this.position.y = clientY - 50
    },
    stopDrag(e) {
      e.stopPropagation()
      this.dragging = false
      document.removeEventListener('touchmove', this.onDrag)
      document.removeEventListener('touchend', this.stopDrag)
      document.removeEventListener('mousemove', this.onDrag)
      document.removeEventListener('mouseup', this.stopDrag)

      if (this.position.x + 50 < window.innerWidth / 2) {
        this.position.x = 0
      } else {
        this.position.x = window.innerWidth - 100
      }
    },
  },
}
</script>

<style scoped lang="less">
.CommunityFloatAds {
  width: 100px;
  height: 100px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 9999;
  background-color: #f00;
}
</style>
