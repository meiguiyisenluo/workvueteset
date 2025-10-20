<template>
  <div>
    <NewGuide></NewGuide>
    <LoginPopup></LoginPopup>
  </div>
</template>
<script>
import LoginPopup from '@/components/LoginPopup.vue'
import NewGuide from '@/components/NewGuide.vue'
export default {
  components: {
    LoginPopup,
    NewGuide,
  },
}
</script>
