<template>
  <div v-if="visible">
    <h1>NewGuide</h1>
    <button @click="onClose">close</button>
  </div>
</template>
<script>
import { LoginPopupVisiblePromise } from '@/utils/PopupVisibleScheduler'
const localstorage_key = 'NewGuide'
export default {
  data() {
    return {
      visible: false,
    }
  },
  async created() {
    if (!(await LoginPopupVisiblePromise)) {
      if (!localStorage.getItem(localstorage_key)) {
        this.visible = true
      }
    }
  },
  methods: {
    onClose() {
      this.visible = false
      localStorage.setItem(localstorage_key, 'true')
    },
  },
}
</script>
