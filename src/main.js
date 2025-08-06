import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import App from './App.vue'
import '@/plugins/vant'

import ExtImage from './components/ExtImage/Index.vue'
Vue.component(ExtImage.name, ExtImage)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
