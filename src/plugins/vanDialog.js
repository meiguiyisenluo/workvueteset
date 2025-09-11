import { Dialog } from 'vant'

export default {
  name: Dialog.Component.name,
  render(h) {
    return h(
      Dialog.Component,
      {
        attrs: {
          ...this.$attrs,
          'get-container': () => window.document.body,
        },
        on: this.$listeners,
      },
      Object.keys(this.$slots).map((name) => {
        return h('template', { slot: name }, this.$slots[name])
      })
    )
  },
}
