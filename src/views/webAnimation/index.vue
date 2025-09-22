<template>
  <div ref="ball" class="ball"></div>
</template>

<script>
export default {
  name: 'webAnimation',
  data() {
    return {
      animation: null,
    }
  },
  created() {
    document.addEventListener('click', this.onclickDocument)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.onclickDocument)
  },
  methods: {
    onclickDocument(e) {
      const { clientX, clientY } = e
      const ball = this.$refs.ball
      const { left, top, width, height } = ball.getBoundingClientRect()
      const initX = left + width / 2
      const initY = top + height / 2
      const targetX = clientX - width / 2
      const targetY = clientY - height / 2

      const rad = Math.atan2(targetY - initY, targetX - initX)
      const deg = (rad * 180) / Math.PI

      ball.getAnimations().forEach((_) => _.cancel())

      ball.animate(
        [
          {
            transform: `translate(${left}px,${top}px) rotate(${deg}deg) scaleX(1)`,
            easing: 'ease-out',
          },
          {
            transform: `translate(${left}px,${top}px) rotate(${deg}deg) scaleX(1.5)`,
            offset: 0.8,
            easing: 'ease-in',
          },
          {
            transform: `translate(${targetX}px,${targetY}px) rotate(${deg}deg) scaleX(1)`,
          },
        ],
        {
          duration: 1000,
          fill: 'forwards',
          ease: '',
        }
      )
    },
  },
}
</script>

<style scoped>
.ball {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #67cc08;
}
</style>
