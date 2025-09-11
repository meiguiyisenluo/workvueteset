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
    path: '/:com(cloudphone|my|find)',
    component: () => import('@/views/MainLayout/index.vue'),
  },
  {
    path: '/inputfileTest',
    component: () => import('@/views/inputfileTest/index.vue'),
  },
  {
    path: '/huangyongTest',
    component: () => import('@/views/huangyongTest/index.vue'),
  },
  {
    path: '/login',
    component: () => import('@/views/Login/Index.vue'),
  },
  {
    path: '/test',
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
  {
    path: '/dragball-test',
    component: () => import('@/views/dragballtest/index.vue'),
  },
  {
    path: '/Iframe-Test',
    component: () => import('@/views/Iframe-Test.vue'),
  },
  {
    path: '/dialog-iframe-test',
    component: () => import('@/views/dialog-iframe-test/index.vue'),
  },
  {
    path: '/vanPopoverTest',
    component: () => import('@/views/vanPopoverTest/index.vue'),
  },
  {
    path: '/imgTest',
    component: () => import('@/views/imgTest/index.vue'),
  },
  {
    path: '/MixBlendModeTest',
    component: () => import('@/views/MixBlendModeTest/index.vue'),
  },
  {
    path: '/cloudphone2',
    component: () => import('@/views/MainLayout/cloudphone2.vue'),
  },
  {
    path: '/swiperTest',
    component: () => import('@/views/swiperTest/Index.vue'),
  },
  {
    path: '/swiperTest2',
    component: () => import('@/views/swiperTest/Index2.vue'),
  },
  {
    path: '/cloudfind',
    component: () => import('@/views/find/Index.vue'),
  },
  {
    path: '/renderTest',
    component: () => import('@/views/renderTest/Index.vue'),
  },
  {
    path: '/cropperjsTest',
    component: () => import('@/views/cropperjsTest/Index.vue'),
  },
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  console.log(to.query)
  console.log(to.query.token)
  if (to.query.token) {
    console.log(removeSSOParam(to.query))
    // https://192.168.0.9:8001/#/?channelSrc=02040&loginType=0&token=ssoToken&activityUrl=https%3A%2F%2Fmail.10086.cn%2Fs%3Ffunc%3Dlogin%3AauthTokenPE%26clientId%3D10110%26token%3D%7B%7BssoTk%7D%7D%26targetSourceId%3D001003%26loginSuccessUrl%3Dhttps%3A%2F%2Fhtml5.mail.10086.cn%2Fhtml%2Frestructure%2Findex.html%23%2Fassistant%3FclientId%3D10110%26channelid%3D900529%26token%3D%7B%7BssoTk%7D%7D%26channelSrc%3Dred-cloudphone-003
    // https://192.168.0.9:8001/#/?channelSrc=02040&loginType=0&token=ssoToken&activityUrl=https://mail.10086.cn/s?func=login:authTokenPE&clientId=10110&token={{ssoTk}}&targetSourceId=001003&loginSuccessUrl=https://html5.mail.10086.cn/html/restructure/index.html#/assistant?clientId=10110&channelid=900529&token={{ssoTk}}&channelSrc=red-cloudphone-003
  }
  next()
})

// 移除单点登录参数
function removeSSOParam(param) {
  const query = { ...param }
  delete query.token // 单点登录token
  delete query.loginType // 单点登录类型
  delete query.cmccApp // 一级掌通登录标志
  return query
}

router.afterEach((to) => {
  const { activityUrl } = to.query
  // window.location.replace(activityUrl)
  console.log(activityUrl)
})

export default router
