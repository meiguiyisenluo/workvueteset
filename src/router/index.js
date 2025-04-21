import Vue from 'vue'
import VueRouter from 'vue-router'
import { Toast } from 'vant'

// 在升级了Vue-Router版本到到3.1.0及以上之后，页面在跳转路由时控制台会报Uncaught (in promise)的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}
Vue.use(VueRouter)

/**
 * 异步 js 文件加载过慢时，添加 loading 提示
 * @param {function} func 异步加载 js 方法
 */
function wrapLoading(func) {
  return () => {
    let timer = setTimeout(() => {
      Toast.loading({
        message: '页面加载中...',
        duration: 0,
      })
    }, 280)
    return new Promise((resolve, reject) => {
      func().then(
        (res) => {
          Toast.clear()
          clearTimeout(timer)
          resolve(res)
        },
        (e) => {
          Toast.clear()
          Toast.fail('加载失败')
          clearTimeout(timer)
          reject(e)
        }
      )
    })
  }
}
wrapLoading(() => Promise.resolve())

const routes = [
  {
    path: '/',
    component: () => import('@/views/test.vue'),
  },
  {
    path: '/clipboard',
    component: () => import('@/views/clipboard.vue'),
  },
  {
    path: '/router-test',
    component: () => import('@/views/routertest/index.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
