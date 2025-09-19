<template>
  <keep-alive include="main-layout">
    <router-view :key="viewKey"></router-view>
  </keep-alive>
</template>
<script>
export default {
  name: 'main-layout',
  data() {
    return {
      viewKey: 0,
    }
  },
  methods: {
    refresh() {
      this.viewKey += 1
    },
  },
}
</script>
