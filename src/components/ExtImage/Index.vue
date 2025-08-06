<template>
  <component
    :is="src.endsWith('.pag') ? 'PagImage' : 'img'"
    :src="src"
    v-bind="$attrs"
    v-on="$listeners"
  ></component>
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
  },
}
</script>
