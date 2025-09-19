<template>
  <button @click="login">Login</button>
</template>
<script>
export default {
  name: 'Login',
  methods: {
    login() {
      fetch('/login').then(() => {
        this.$store.commit('setToken', 'mock-token')
        this.$router.push(this.$route.query.from || '/')
      })
    },
  },
}
</script>
