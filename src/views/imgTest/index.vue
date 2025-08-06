<template>
  <div>
    <h2>https://blog.r2.1591420.xyz/imgTest/01.bmp</h2>
    <img src="https://blog.r2.1591420.xyz/imgTest/01.bmp" alt="" />
    <h2>https://blog.r2.1591420.xyz/imgTest/01.webp</h2>
    <img src="https://blog.r2.1591420.xyz/imgTest/01.webp" alt="" />
    <h2>https://blog.r2.1591420.xyz/imgTest/01.pag</h2>
    <!-- <img src="https://blog.r2.1591420.xyz/imgTest/01.pag" alt="" /> -->
    <canvas id="pagTest"></canvas>
  </div>
</template>
<script>
import { PAGInit } from 'libpag'

export default {
  created() {
    // Initialize pag webassembly module.
    PAGInit().then(async (PAG) => {
      // Fetch pag file data.
      const buffer = await fetch(
        'https://blog.r2.1591420.xyz/imgTest/01.pag'
      ).then((response) => response.arrayBuffer())
      // Load the PAGFile from data.
      const pagFile = await PAG.PAGFile.load(buffer)
      // Set canvas size from the PAGFile size.
      const canvas = document.getElementById('pagTest')
      canvas.width = pagFile.width()
      canvas.height = pagFile.height()
      // Create PAGView.
      const pagView = await PAG.PAGView.init(pagFile, canvas)
      // Play PAGView.
      await pagView.play()
    })
  },
}
</script>
<style>
img {
  width: 300px;
}
</style>
