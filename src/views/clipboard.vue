<template>
  <div>
    <h2>剪切板</h2>
    <input type="text" v-model="text" />
    <!-- <button @click="getClipboardContents">
      把剪切板内容粘贴到input中（navigator.clipboard.readText 有效）
    </button> -->
    <button @click="copyToClipboard">
      把input内容复制到剪切板（navigator.clipboard.writeText 有效）
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '123',
    }
  },
  created() {
    this.getClipboardContents()
    document.addEventListener('copy', this.oncopy)
    document.addEventListener('visibilitychange', this.onvisibilitychange)
  },
  beforeDestroy() {
    document.removeEventListener('copy', this.oncopy)
    document.removeEventListener('visibilitychange', this.onvisibilitychange)
  },
  methods: {
    async onvisibilitychange() {
      if (!document.hidden || document.visibilityState == 'visible') {
        const checkFocus = () => {
          if (document.hasFocus()) {
            this.getClipboardContents()
          } else {
            requestAnimationFrame(checkFocus)
          }
        }
        checkFocus()
      }
    },

    oncopy() {
      const selection = window.getSelection().toString() // 获取用户选择的文本
      alert('用户复制的文本是：' + selection)
    },

    async getClipboardContents() {
      try {
        const text = await navigator.clipboard.readText()
        alert('用户复制的文本是：' + text)
      } catch (error) {
        alert('Failed to read clipboard contents: ' + error)
      }
    },

    async copyToClipboard() {
      const text = this.text // 获取输入框中的文本
      try {
        await navigator.clipboard.writeText(text) // 将文本写入剪切板
        console.log('文本已复制到剪切板:', text)
      } catch (error) {
        console.error('无法写入剪切板:', error)
      }
    },
  },
}
</script>
