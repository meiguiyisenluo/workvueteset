<template>
  <div v-if="loading">
    <slot name="loading"></slot>
  </div>
  <canvas
    v-else
    ref="canvas"
    v-bind="$attrs"
    v-on="$listeners"
    :style="{
      width: width,
      height: height,
      borderRadius: radius,
    }"
  ></canvas>
</template>

<script>
import { PAGInit } from 'libpag'

const PAGP = PAGInit()

export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    width: {
      type: String,
    },
    height: {
      type: String,
    },
    radius: {
      type: String,
    },
  },
  data() {
    return {
      loading: true,
      pagView: null,
      pagFile: null,
    }
  },
  watch: {
    src: {
      immediate: true,
      async handler() {
        // Reinitialize the PAG player when the src changes.
        this.init()
      },
    },
  },
  async mounted() {
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy() {
    this.destroy()
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    async init() {
      if (!this.src) return
      await this.destroy() // Destroy any existing instance before creating a new one
      try {
        this.loading = true
        // Initialize pag webassembly module.
        const PAG = await PAGP
        // Fetch pag file data.
        const res = await fetch(this.src)
        // Convert the response to an ArrayBuffer.
        const buffer = await res.arrayBuffer()
        // Load the PAGFile from data.
        this.pagFile = await PAG.PAGFile.load(buffer)
        this.loading = false
        this.$emit('loaded')
        await this.$nextTick()
        // Set canvas size from the PAGFile size.
        this.calcCanvasSize()
        // Create PAGView.
        this.pagView = await PAG.PAGView.init(this.pagFile, this.$refs.canvas, {
          // 多个PAGView兼容，但有性能问题，详见：https://pag.io/docs/web-play-pagfile.html#%E5%A4%9A%E4%B8%AA-pagview
          // useCanvas2D: true,
          // 关闭高清渲染，自行计算canvas宽高
          useScale: false,
          // 首帧渲染兼容，详见：https://pag.io/docs/web-play-pagfile.html#%E9%A6%96%E5%B8%A7%E6%B8%B2%E6%9F%93
          firstFrame: false,
        })
        // Set PAGView repeat.
        this.pagView.setRepeatCount(0)
        // Play PAGView.
        await this.pagView.play()
      } catch (error) {
        return this.$emit('error', error)
      }
    },

    async destroy() {
      // 清除旧实例
      if (this.pagView) {
        await this.pagView.stop()
        await this.pagView.destroy()
        this.pagView = null
      }
      if (this.pagFile) {
        await this.pagFile.destroy()
        this.pagFile = null
      }
    },

    calcCanvasSize() {
      // 计算canvas的宽高
      const canvas = this.$refs.canvas

      // const width = this.pagFile.width()
      // const height = this.pagFile.height()
      // const per = width / height

      const styleDeclaration = window.getComputedStyle(canvas, null)
      const width =
        Number(styleDeclaration.width.replace('px', '')) *
        window.devicePixelRatio *
        1.2
      // 这里的1.5是为了适配高清屏幕，实际可以根据
      const height =
        Number(styleDeclaration.height.replace('px', '')) *
        window.devicePixelRatio *
        1.2
      // 这里的1.5是为了适配高清屏幕，实际可以根据

      canvas.width = width
      canvas.height = height
    },

    async resize() {
      if (!this.pagView) return
      this.calcCanvasSize()
      await this.pagView.updateSize()
      await this.pagView.flush()
    },
  },
}
</script>
