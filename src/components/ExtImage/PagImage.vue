<template>
  <canvas ref="canvas" v-bind="$attrs" v-on="$listeners"></canvas>
</template>

<script>
// import { PAGInit } from 'libpag'

export default {
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  async created() {
    // Initialize pag webassembly module.
    // const PAG = await PAGInit()
    const PAG = await window.libpag.PAGInit()

    // Fetch pag file data.
    const buffer = await fetch(this.src).then((_) => _.arrayBuffer())
    // Load the PAGFile from data.
    const pagFile = await PAG.PAGFile.load(buffer)
    // Set canvas size from the PAGFile size.
    const canvas = this.$refs.canvas
    canvas.width = pagFile.width()
    canvas.height = pagFile.height()
    // Create PAGView.
    const pagView = await PAG.PAGView.init(pagFile, canvas)
    // Play PAGView.
    await pagView.play()
  },
}
</script>
