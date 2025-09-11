import { Popup } from 'vant'

export default {
  name: Popup.name,
  render(h) {
    return h(
      Popup,
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
