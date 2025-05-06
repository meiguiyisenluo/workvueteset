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

    <h3>测试用例：所有测试内容应以用户无感为最优体验</h3>
    <h4>1.云机复制到本机</h4>
    <ul>
      <li>
        在输入框中输入任意内容，点击按钮，输入框中的内容复制到剪切板，可到任意文本编辑区域粘贴测试
      </li>
    </ul>
    <h4>2.本机复制到云机</h4>
    <ul>
      <li>在浏览器本标签页中复制文本，alert 复制的文本内容</li>
      <li>
        在浏览器其他的标签页复制文本，回来浏览器本标签页，alert 复制的文本内容
      </li>
      <li>
        在非本浏览器的其他应用中复制文本，回来浏览器本标签页，alert
        复制的文本内容
      </li>
      <li>
        在非本浏览器的其他应用中复制文本，刷新本标签页，alert 复制的文本内容
      </li>
      <li>
        在非本浏览器的其他应用中复制文本，新建标签页访问本链接，alert
        复制的文本内容
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '123',
      interval: undefined,
    }
  },
  created() {
    this.getClipboardContents()
    document.addEventListener('copy', this.oncopy)
    document.addEventListener('visibilitychange', this.onvisibilitychange)

    this.interval = setInterval(() => {
      this.copyToClipboard()
    }, 3000)
  },
  beforeDestroy() {
    document.removeEventListener('copy', this.oncopy)
    document.removeEventListener('visibilitychange', this.onvisibilitychange)
    clearInterval(this.interval)
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
