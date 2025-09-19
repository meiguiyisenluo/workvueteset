export default {
  methods: {
    needLogin() {
      if (!this.$store.state.token) {
        this.$router.push({
          path: '/login',
          query: { from: this.$route.fullPath },
        })
        throw new Error('用户未登录')
      }
    },
  },
}
