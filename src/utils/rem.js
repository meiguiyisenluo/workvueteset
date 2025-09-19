import debounce from 'lodash.debounce'

const remUtils = {
  maxWidth: 999999, // 最大适配宽度
  minWidth: 320,
  _hasListened: false,
  init(options = {}) {
    this.maxWidth = options.maxWidth || this.maxWidth
    this.updateRem = this.updateRem.bind(this)
    this._updateRem = debounce(this.updateRem, 150)
    this._addListener()
  },
  setMaxWidth(width) {
    this.maxWidth = width
    this.updateRem()
  },
  updateRem() {
    // 750: 设计稿的宽度; 100: 设计稿宽度下一个 rem 的值
    // 源码样式中的数值(rem) = 设计稿数值(px) / 100
    const designWidth = 750
    const prem = 100
    let html = document.getElementsByTagName('html')[0]
    let oWidth =
      document.body.clientWidth || document.documentElement.clientWidth
    // 横屏
    if (window.orientation == 90 || window.orientation == -90) {
      oWidth =
        document.body.clientHeight || document.documentElement.clientHeight
    }
    // 竖屏
    if (window.orientation == 180 || window.orientation == 0) {
      oWidth = document.body.clientWidth || document.documentElement.clientWidth
    }
    if (oWidth < this.minWidth) {
      //此处最小值限制，是为了适配div#app 的最小宽度
      oWidth = this.minWidth
    } else if (oWidth > this.maxWidth) {
      // 此处最大值限制，是为了适配 div#app 的最大宽度
      oWidth = this.maxWidth
    }
    //限制字体rem计算的最大宽度为475
    oWidth = Math.min(oWidth, 475)

    const size = (oWidth / designWidth) * prem
    html.style.fontSize = size + 'px'
  },
  remove() {
    this._removeListener()
  },
  _addListener() {
    if (!this._hasListened) {
      window.addEventListener('DOMContentLoaded', this.updateRem)
      window.addEventListener('resize', this.updateRem)
      window.addEventListener('orientationchange', this._updateRem, false)
      this._hasListened = true
    }
  },
  _removeListener() {
    window.removeEventListener('DOMContentLoaded', this.updateRem)
    window.removeEventListener('resize', this.updateRem)
    window.removeEventListener('orientationchange', this._updateRem)
    this._hasListened = false
  },
}

export default remUtils
