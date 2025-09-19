import Vue from 'vue'
import EditImage from './EditImage.vue'
const EditImageNode = Vue.extend(EditImage)

export default {
  install() {
    Vue.prototype.$EditImage = (url) => {
      return new Promise((resolve, reject) => {
        const instance = new EditImageNode({
          propsData: { url },
          // 你可以用事件通信
          methods: {
            resolve(...args) {
              instance.$destroy()
              instance.$el.remove()
              resolve(...args)
            },
            reject(...args) {
              instance.$destroy()
              instance.$el.remove()
              reject(...args)
            },
          },
        })
        instance.$mount()
        document.body.appendChild(instance.$el)
      })
    }
  },
}
