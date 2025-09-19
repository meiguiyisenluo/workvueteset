<template>
  <div>
    <!-- <div>
      <button @click="toggleClick">toggle</button>
      <h2>{{ srcs[index] }}</h2>
      <ExtImage class="ExtImage" :src="srcs[index]" alt="" />
    </div> -->

    <div v-for="(src, idx) in dataList" :key="idx">
      <h2>{{ idx + 1 }}</h2>
      <ExtImage class="ExtImage" :src="src" alt="" />
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
  mounted() {
    this.mockGetData()
  },
  methods: {
    toggleClick() {
      this.index = (this.index + 1) % this.srcs.length
    },
    mockGetData() {
      Promise.resolve().then(() => {
        this.dataList = [
          // 'https://test.r2.1591420.xyz/ceshitup/bmp/pepper.bmp',
          // 'https://test.r2.1591420.xyz/ceshitup/webp/01.webp',

          //  'https://plus.buy.139.com/cloudimage/dashboard/202508/1952993427494932480.pag',

          'https://test.r2.1591420.xyz/ceshitup/pag/test1.pag',
          'https://test.r2.1591420.xyz/ceshitup/pag/fans.pag',
          'https://test.r2.1591420.xyz/ceshitup/pag/like.pag',

          'https://test.r2.1591420.xyz/ceshitup/pag/fans.pag',
          'https://test.r2.1591420.xyz/ceshitup/pag/fans.pag',
          'https://test.r2.1591420.xyz/ceshitup/pag/fans.pag',
          'https://test.r2.1591420.xyz/ceshitup/pag/fans.pag',
          'https://test.r2.1591420.xyz/ceshitup/pag/fans.pag',
          'https://test.r2.1591420.xyz/ceshitup/pag/fans.pag',
          'https://test.r2.1591420.xyz/ceshitup/pag/fans.pag',
          'https://test.r2.1591420.xyz/ceshitup/pag/fans.pag',
          'https://test.r2.1591420.xyz/ceshitup/pag/fans.pag',
          'https://test.r2.1591420.xyz/ceshitup/pag/fans.pag',
          'https://test.r2.1591420.xyz/ceshitup/pag/fans.pag',
          'https://test.r2.1591420.xyz/ceshitup/pag/fans.pag',
          'https://test.r2.1591420.xyz/ceshitup/pag/fans.pag',
          'https://test.r2.1591420.xyz/ceshitup/pag/fans.pag',
        ]
      })
    },
  },
}
</script>
<style>
.ExtImage {
  width: 100%;
}
</style>
