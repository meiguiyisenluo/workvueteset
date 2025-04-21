<template>
  <button @click="jump">router.push</button>
</template>
<script>
export default {
  methods: {
    jump() {
      this.$router.push({
        path: '/router-test',
        query: {
          ...this.$route.query,
          phoneId: 'asdkflj',
        },
      })
    },
  },
}
</script>
