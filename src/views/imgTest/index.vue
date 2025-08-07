<template>
  <div>
    <button @click="toggleClick">toggle</button>
    <h2>{{ srcs[index] }}</h2>
    <ExtImage class="ExtImage" :src="srcs[index]" alt="" />

    <div v-for="item in dataList" :key="item.id">
      <h2>{{ item.src }}</h2>
      <ExtImage class="ExtImage" :src="item.src" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 0,
      srcs: [
        'https://test.r2.1591420.xyz/ceshitup/pag/fans.pag',
        'https://test.r2.1591420.xyz/ceshitup/pag/like.pag',
      ],
      dataList: [],
    }
  },
  created() {
    this.mockGetData()
  },
  methods: {
    toggleClick() {
      this.index = (this.index + 1) % this.srcs.length
    },
    mockGetData() {
      Promise.resolve().then(() => {
        this.dataList = [
          {
            id: 1,
            src: 'https://test.r2.1591420.xyz/ceshitup/pag/fans.pag',
          },
          {
            id: 2,
            src: 'https://test.r2.1591420.xyz/ceshitup/pag/like.pag',
          },
          {
            id: 3,
            src: 'https://test.r2.1591420.xyz/ceshitup/bmp/pepper.bmp',
          },
          {
            id: 4,
            src: 'https://test.r2.1591420.xyz/ceshitup/webp/01.webp',
          },
        ]
      })
    },
  },
}
</script>
<style>
.ExtImage {
  width: 300px;
}
</style>
