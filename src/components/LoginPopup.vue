<template>
  <div v-if="visible">LoginPopup</div>
</template>

<script>
import { LoginPopupVisibleResolve } from '@/utils/PopupVisibleScheduler'
import { sleep } from '@/utils/utils'
export default {
  data() {
    return {
      visible: false,
    }
  },
  created() {
    this.show()
  },
  methods: {
    async show() {
      await sleep(1000)
      const res = true
      this.visible = res
      LoginPopupVisibleResolve(res)
    },
  },
}
</script>
