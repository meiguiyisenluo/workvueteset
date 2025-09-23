<template>
  <div>
    <slot></slot>
    <CommunityFloatAds v-if="$route.path == $attrs.show"></CommunityFloatAds>
  </div>
</template>

<script>
import CommunityFloatAds from './CommunityFloatAds.vue'
export default {
  name: '',
  components: {
    CommunityFloatAds,
  },
  watch: {
    $route: {
      immediate: true,
      handler(n) {
        const map = {
          '/portalvueTestCloudphone': 'red',
          '/portalvueTestFind': 'blue',
        }
        this.color = map[n.path]
      },
    },
  },
}
</script>

<style></style>
