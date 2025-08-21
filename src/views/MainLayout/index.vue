<template>
  <div>
    <div>{{ $route.params.com }}</div>
    <button @click="$router.push('/find')">to find</button>
    <button @click="$router.push('/cloudphone')">to cloudphone</button>
    <button @click="$router.push('/my')">to my</button>

    <button @click="$router.push('/login')">to login</button>
  </div>
</template>
<script>
export default {
  name: 'main-layout',

  activated() {
    console.log('lystest', 'keep-alive', 'activated')
  },
  deactivated() {
    console.log('lystest', 'keep-alive', 'deactivated')
  },

  beforeRouteEnter(to, from, next) {
    console.log('lystest', 'route', 'beforeRouteEnter')
    next()
  },
  beforeRouteUpdate(to, from, next) {
    console.log('lystest', 'route', 'beforeRouteUpdate')
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log('lystest', 'route', 'beforeRouteLeave')
    next()
  },

  beforeCreate() {
    console.log('lystest', 'component', 'beforeCreate')
  },
  created() {
    console.log('lystest', 'component', 'created')
  },
  beforeMount() {
    console.log('lystest', 'component', 'beforeMount')
  },
  mounted() {
    console.log('lystest', 'component', 'mounted')
  },
  beforeUpdate() {
    console.log('lystest', 'component', 'beforeUpdate')
  },
  updated() {
    console.log('lystest', 'component', 'updated')
  },
  beforeDestroy() {
    console.log('lystest', 'component', 'beforeDestroy')
  },
  destroyed() {
    console.log('lystest', 'component', 'destroyed')
  },
}
</script>
