import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import App from './App.vue'
import '@/plugins/vant'
import '@/plugins/swiper'
import remUtils from '@/utils/rem.js'

remUtils.init()

// 兼容pag格式的图片组件
import ExtImage from './components/ExtImage/Index.vue'
Vue.component(ExtImage.name, ExtImage)

import needLogin from '@/mixins/needLogin'
Vue.mixin(needLogin)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
