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
  methods: {
    async getClipboardContents() {
      try {
        const text = await navigator.clipboard.readText()
        this.text = text
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
