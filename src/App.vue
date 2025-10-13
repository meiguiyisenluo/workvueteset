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

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>
