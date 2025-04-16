import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist/dist/umd/index.js' // 引入 umd 的格式以兼容低版本浏览器

Vue.use(Vuex)

const vuexLocal = new VuexPersist({
  modules: [
  ],
  storage: window.localStorage, //可选，localStorage/sessionStorage/indexDB
  key: 'vuex-mcloudGame',
})


export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
  },
  getters:{},
  mutations:{},
  actions: {
  },
  plugins: [vuexLocal.plugin],
})
