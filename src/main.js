import '@/plugins/swiper'
import '@/plugins/vant'
import router from '@/router'
import store from '@/store'
import remUtils from '@/utils/rem.js'
import Vue from 'vue'
import App from './App.vue'

remUtils.init()

// 兼容pag格式的图片组件
import ExtImage from './components/ExtImage/Index.vue'
Vue.component(ExtImage.name, ExtImage)

import needLogin from '@/mixins/needLogin'
Vue.mixin(needLogin)

import EditImage from '@/components/EditImage'
Vue.use(EditImage)

import portalvue from 'portal-vue'
Vue.use(portalvue)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
