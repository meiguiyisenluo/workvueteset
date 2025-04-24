/**
 * 背景：
 * window.onload = fn1; window.onload = fn2 会导致 fn1 被覆盖
 * 所以用 listener 来管理事件绑定，避免绑定覆盖的问题
 *
 * 用法：
 * listener.add(window. 'onload', fn1)
 * listener.add(window. 'onload', fn2)
 * listener.remove(window. 'onload', fn1)
 */
const listener = {
  _initedMap: {},
  _cbMap: {},
  _trigger(owner, key, e) {
    const uid = this._getUid(owner, key)
    const cbs = this._cbMap[uid] || []
    cbs.forEach(function (cb) {
      cb(e)
    })
  },
  _init(owner, key) {
    const uid = this._getUid(owner, key)
    if (!this._initedMap[uid]) {
      const self = this
      const origin = owner[key]
      owner[key] = function (e) {
        typeof origin === 'function' && origin(e)
        self._trigger(owner, key, e)
      }
    }
    this._initedMap[uid] = true
  },
  _getUid(owner, key) {
    // document.toString() => '[object HTMLDocument]'
    // window.toString() => '[object Window]'
    const uid = `${owner.toString()}--${key}`
    return uid
  },
  add(owner, key, fn) {
    const uid = this._getUid(owner, key)
    this._cbMap[uid] = this._cbMap[uid] || []
    this._cbMap[uid].push(fn)
    this._init(owner, key)
  },
  remove(owner, key, fn) {
    const uid = this._getUid(owner, key)
    const cbs = this._cbMap[uid] || []
    const index = cbs.indexOf(fn)
    if (index > -1) {
      cbs.splice(index, 1)
    }
  },
}

export default listener
