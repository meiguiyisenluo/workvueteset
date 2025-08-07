<template>
  <div>
    <button @click="toggleClick">toggle</button>
    <h2>{{ srcs[index] }}</h2>
    <ExtImage class="ExtImage" :src="srcs[index]" alt="" />

    <div v-for="item in dataList" :key="item.id">
      <h2>{{ item.name }}</h2>
      <ExtImage class="ExtImage" :src="item.src" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'imgTest',
  data() {
    return {
      index: 0,
      srcs: [
        'https://blog.r2.1591420.xyz/imgTest/fans.pag',
        'https://blog.r2.1591420.xyz/imgTest/like.pag',
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
      this.dataList = [
        {
          id: 1,
          name: 'fans.pag',
          src: 'https://blog.r2.1591420.xyz/imgTest/fans.pag',
        },
        {
          id: 2,
          name: 'like.pag',
          src: 'https://blog.r2.1591420.xyz/imgTest/like.pag',
        },
        {
          id: 3,
          name: '01.bmp',
          src: 'https://blog.r2.1591420.xyz/imgTest/01.bmp',
        },
        {
          id: 4,
          name: '01.webp',
          src: 'https://blog.r2.1591420.xyz/imgTest/01.webp',
        },
      ]
    },
  },
}
</script>
<style>
.ExtImage {
  width: 300px;
}
</style>
