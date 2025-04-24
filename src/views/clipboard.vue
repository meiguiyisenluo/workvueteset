<template>
  <div>
    <h2>剪切板</h2>
    <input type="text" v-model="text" />
    <button @click="getClipboardContents">
      把剪切板内容粘贴到input中（navigator.clipboard.readText 有效）
    </button>
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
    this.readClipboardPeriodically()
    document.addEventListener('copy', this.onCopy)
  },
  beforeDestroy() {
    document.removeEventListener('copy', this.onCopy)
  },
  methods: {
    async readClipboardPeriodically() {
      window.document.addEventListener('visibilitychange', () => {
        if (!document.hidden || document.visibilityState == 'visible') {
          const interval = setInterval(async () => {
            if (!document.hasFocus()) return
            clearInterval(interval)
            try {
              const text = await navigator.clipboard.readText()
              alert('用户复制的文本是：' + text)
            } catch (err) {
              console.log('Failed to read clipboard:', err)
            }
          }, 100)
        }
      })
    },

    onCopy() {
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
