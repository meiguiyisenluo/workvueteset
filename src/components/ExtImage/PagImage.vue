<template>
  <canvas ref="canvas" v-bind="$attrs" v-on="$listeners"></canvas>
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
  },
  data() {
    return {
      pagView: null,
      pagFile: null,
    }
  },
  watch: {
    src: {
      immediate: true,
      async handler() {
        // 清除旧实例
        if (this.pagFile) {
          await this.pagFile.destroy()
          this.pagFile = null
        }
        if (this.pagView) {
          await this.pagView.destroy()
          // console.log('destroy pagView', this.pagView)
          this.pagView = null
        }
        // Reinitialize the PAG player when the src changes.
        this.init()
      },
    },
  },
  async created() {
    // Initialize the PAG player when the component is created.
    this.init()
  },
  methods: {
    async init() {
      try {
        // Initialize pag webassembly module.
        const PAG = await PAGP
        // Fetch pag file data.
        const buffer = await fetch(this.src).then((_) => _.arrayBuffer())
        // Load the PAGFile from data.
        this.pagFile = await PAG.PAGFile.load(buffer)
        this.$emit('loaded')
        // Set canvas size from the PAGFile size.
        const canvas = this.$refs.canvas
        canvas.width = this.pagFile.width()
        canvas.height = this.pagFile.height()
        // Create PAGView.
        this.pagView = await PAG.PAGView.init(this.pagFile, canvas)
        // Set PAGView repeat.
        this.pagView.setRepeatCount(0)
        // Play PAGView.
        await this.pagView.play()
      } catch (error) {
        return this.$emit('loaded', error)
      }
    },
  },
}
</script>
