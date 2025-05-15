<template>
  <div>
    <h2>appleAppStore</h2>
    <button @click="appleAppStore">appleAppStore</button>

    <br />

    <h2>电话</h2>
    <button @click="tel">tel</button>

    <br />

    <h2>拉起本地app</h2>
    <button @click="openScheme('weixin://')">weixin</button>
    <button @click="openScheme('mcloud://')">mcloud</button>
    <button @click="openScheme('p139://')">p139</button>
    <div class="res"></div>

    <br />

    <h2>ip test</h2>
    <div id="ip_test"></div>

    <br />

    <br />

    <h2>sessionStorage</h2>
    <button @click="setSessionStorage">
      sessionStorage.setItem('test', 'test')
    </button>
    <button @click="getSessionStorage">
      sessionStorage.getItem('test') & alert
    </button>
    <a href="https://www.baidu.com/">去百度</a>

    <br />

    <div>{{ entry }}</div>

    <div>V1</div>
  </div>
</template>

<script>
function loadJs(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.onload = resolve
    script.onerror = reject
    script.src = src
    document.head.appendChild(script)
  })
}

export default {
  data() {
    return {
      entry: {},
    }
  },
  created() {
    const p1 = new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntriesByType('resource')
        entries.forEach((entry) => {
          if (entry.name.includes('ipv6.js')) {
            console.log(entry)
            this.entry = entry
            resolve(entry)
          }
        })
      })
      observer.observe({ type: 'resource', buffered: true })
    })

    const p2 = loadJs('https://cloudv6.139.com/ipv6.js')
      .then(() => `ipv6.js 加载成功`)
      .catch(() => 'ipv6.js 加载失败')

    Promise.all([p1, p2]).then(([entry, msg]) => {
      alert(`${msg}，耗时：${entry.duration}`)
    })
  },
  methods: {
    setSessionStorage() {
      sessionStorage.setItem('test', 'test')
    },
    getSessionStorage() {
      alert(sessionStorage.getItem('test'))
    },

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

    tel() {
      let link = document.createElement('a')
      link.href = `tel:${15914203799}`
      link.click()
      link = null
    },

    /**
     * 三个页面可见性API参考：@see:https://developer.mozilla.org/zh-CN/docs/Web/API/Page_Visibility_API
     * 最好加debounce，避免setTimeout扰乱逻辑
     * 定时器设置在1500，并且设置完定时器再跳转，测试正确性较高
     */
    openScheme(scheme) {
      let success = false
      window.document.addEventListener(
        'visibilitychange',
        () => {
          if (document.visibilityState != 'visible') success = true
        },
        { once: true }
      )

      setTimeout(() => {
        console.log(
          document.hidden,
          document.visibilityState != 'visible',
          success
        )
        if (
          document.hidden ||
          document.visibilityState != 'visible' ||
          success
        ) {
          document.querySelector('.res').innerHTML = 'success'
        } else {
          document.querySelector('.res').innerHTML = 'failed'
        }
      }, 1500)

      window.location.href = scheme
    },

    appleAppStore() {
      window.location.href =
        'https://apps.apple.com/cn/app/%E7%8E%8B%E8%80%85%E8%8D%A3%E8%80%80/id989673964'
    },
  },
}
</script>
