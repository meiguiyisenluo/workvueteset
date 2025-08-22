<template>
  <swiper
    ref="swiper"
    :options="swiperOptions"
    @slideChangeTransitionEnd="slideChangeTransitionEnd"
  >
    <swiper-slide v-for="item in tabData" :key="item.path">
      <keep-alive>
        <component :is="item.name" :ref="item.name"></component>
      </keep-alive>
    </swiper-slide>
  </swiper>
</template>
<script>
const cloudphone = () =>
  import(/* webpackChunkName: "chunk-cloudphone" */ './cloudphone.vue')
const find = () => import(/* webpackChunkName: "chunk-find" */ './find.vue')
const my = () => import(/* webpackChunkName: "chunk-my" */ './my.vue')

const tabData = [
  {
    name: 'find',
    path: '/find',
    label: '发现',
    trackName: '点击发现tab',
    collectData: { event: 'tab_click', tab_name: '发现' },
    badge: {
      show: false,
      text: '-',
    },
    contentScrollTop: 0,
  },
  {
    name: 'cloudphone',
    path: '/cloudphone',
    label: '首页',
    trackName: '点击云手机tab',
    collectData: { event: 'tab_click', tab_name: '首页' },
    badge: {
      show: false,
      text: '-',
    },
    contentScrollTop: 0,
  },
  {
    name: 'my',
    path: '/my',
    label: '我的',
    trackName: '点击我的tab',
    collectData: { event: 'tab_click', tab_name: '我的' },
    badge: {
      show: false,
      text: '-',
    },
    contentScrollTop: 0,
  },
]

export default {
  name: 'main-layout',
  components: {
    cloudphone,
    find,
    my,
  },
  data() {
    const initActive = tabData.findIndex((_) => _.path === this.$route.path)
    return {
      active: initActive,
      swiperOptions: {
        initialSlide: initActive,
        autoHeight: true,
        noSwiping: true,
        noSwipingClass: 'main-layout-swiper-no-swiping',
      },
      tabData,
    }
  },
  methods: {
    slideChangeTransitionEnd() {
      this.active = this.$refs.swiper.swiper.activeIndex
      console.log('slideChangeTransitionEnd', this.active)
      this.$router.push(this.tabData[this.active].path)
    },
  },

  // activated() {
  //   console.log('lystest', 'keep-alive', 'activated')
  // },
  // deactivated() {
  //   console.log('lystest', 'keep-alive', 'deactivated')
  // },

  // beforeRouteEnter(to, from, next) {
  //   console.log('lystest', 'route', 'beforeRouteEnter')
  //   next()
  // },
  // beforeRouteUpdate(to, from, next) {
  //   console.log('lystest', 'route', 'beforeRouteUpdate')
  //   next()
  // },
  // beforeRouteLeave(to, from, next) {
  //   console.log('lystest', 'route', 'beforeRouteLeave')
  //   next()
  // },

  // beforeCreate() {
  //   console.log('lystest', 'component', 'beforeCreate')
  // },
  // created() {
  //   console.log('lystest', 'component', 'created')
  // },
  // beforeMount() {
  //   console.log('lystest', 'component', 'beforeMount')
  // },
  // mounted() {
  //   console.log('lystest', 'component', 'mounted')
  // },
  // beforeUpdate() {
  //   console.log('lystest', 'component', 'beforeUpdate')
  // },
  // updated() {
  //   console.log('lystest', 'component', 'updated')
  // },
  // beforeDestroy() {
  //   console.log('lystest', 'component', 'beforeDestroy')
  // },
  // destroyed() {
  //   console.log('lystest', 'component', 'destroyed')
  // },
}
</script>
