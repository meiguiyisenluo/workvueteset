<template>
  <component
    :is="usePadImage ? 'PagImage' : as"
    :src="src"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <!-- <template #loading>
      <slot name="loading"> </slot>
    </template> -->
    <template v-for="(_, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
  </component>
</template>

<script>
import PagImage from './PagImage.vue'
export default {
  name: 'ExtImage',
  components: { PagImage },
  props: {
    src: {
      type: String,
      required: true,
    },
    as: {
      type: String,
      default: 'img',
    },
  },
  computed: {
    usePadImage() {
      return this.src.endsWith('.pag')
    },
  },
}
</script>
