<template>
  <div>
    routertest
    <Com></Com>
  </div>
</template>

<script>
import Com from './components/com.vue'
export default {
  components: { Com },
  watch: {
    '$route.query.phoneId'() {
      window.location.reload()
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter')
    next()
  },
  beforeCreate() {
    console.log(
      'beforeCreate',
      this.$route.query.phoneId,
      this.$route.query.lockStatus
    )
  },
  created() {
    console.log(
      'created',
      this.$route.query.phoneId,
      this.$route.query.lockStatus
    )
  },
  beforeMount() {
    console.log(
      'beforeMount',
      this.$route.query.phoneId,
      this.$route.query.lockStatus
    )
  },
  mounted() {
    console.log(
      'mounted',
      this.$route.query.phoneId,
      this.$route.query.lockStatus
    )
  },
  beforeDestroy() {
    console.log(
      'beforeDestroy',
      this.$route.query.phoneId,
      this.$route.query.lockStatus
    )
  },
  destroyed() {
    console.log(
      'destroyed',
      this.$route.query.phoneId,
      this.$route.query.lockStatus
    )
  },
  beforeRouteLeave() {
    console.log(
      'beforeRouteLeave',
      this.$route.query.phoneId,
      this.$route.query.lockStatus
    )
  },
}
</script>
