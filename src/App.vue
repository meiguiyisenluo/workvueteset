<template>
  <div>
    <button @click="refresh">refresh</button>
    <keep-alive include="main-layout">
      <router-view :key="viewKey"></router-view>
    </keep-alive>
  </div>
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
