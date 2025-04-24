<template>
  <div
    class="drag-ball"
    :class="{ noOpacity: refBackBtnTips?.visible }"
    ref="dragBall"
    @touchstart.stop.prevent="touchstart"
    @touchmove.stop.prevent="touchmove"
    @touchend.stop.prevent="touchend"
    @mousedown.stop.prevent="touchstart"
    @transitionend="calcContent"
    :flowStyle="flowStyle"
  >
    <div class="container">
      <template v-if="mountDragBall">
        <div
          class="bg"
          v-show="showDefaultBg"
          :style="{
            backgroundImage: `url(${defaultBallBg})`,
          }"
        ></div>
        <div
          v-show="iconAnimationMsg.visible"
          class="bg advertise"
          :style="{
            backgroundImage: `url(${
              floatContent.activityFloatImgUrl || defaultBallBg
            })`,
            animationPlayState: iconAnimationMsg.animationPlayState,
          }"
          @animationend="onScaleOutEnd"
        ></div>
        <div
          v-show="tipsAnimationMsg.visible"
          :class="`tips ${tipsDirection} ${tipsAnimationMsg.name} ${
            'type' + floatContent.floatContentType
          }`"
          @animationend="onTipsAnimationEnd"
          @touchstart.stop.prevent
          @touchmove.stop.prevent
          @mousedown.stop.prevent
          @touchend.stop.prevent="onTipsClick"
        >
          <div class="close_btn">
            <img
              src="@/assets/img/dragBall/close_btn.png"
              alt=""
              v-if="floatContent.closeButton"
              @touchstart.stop.prevent
              @touchmove.stop.prevent
              @mousedown.stop.prevent
              @touchend.stop.prevent="closeTips"
            />
          </div>
          <div
            class="content"
            :style="{
              backgroundImage:
                floatContent.floatContentType == 2
                  ? `url(${floatContent.advertisementUrl})`
                  : undefined,
            }"
          >
            <span
              v-if="floatContent.floatContentType == 1"
              v-show="tipsAnimationMsg.visible"
              @animationend.stop
              >{{ floatContent.floatText || '更多功能，尽在悬浮球' }}</span
            >
          </div>
        </div>
      </template>

      <div
        v-if="foregroundapp.from"
        :class="`back_btn ${mountDragBall ? backBtnDirection : ''}`"
      >
        <img
          :src="appInfo.tasteConfig.appLogoData"
          alt=""
          class="back_btn_img"
          @load="onBackBtnLoad"
        />
      </div>
    </div>
  </div>
</template>
<script>
import listener from '@/utils/listener'

import { browser } from '@/utils/browser.js'

import ballBgS from '@/assets/img/dragball_new/levitated-sphere-icon.png'
import ballBgG from '@/assets/img/dragball_new/levitated-sphere-icon-game.png'

export default {
  name: 'drag-ball',
  props: {
    osLandscape: Boolean,
    id: String,
    appInfo: Object,
    flowStyle: Number,
    foregroundapp: Object,
    refBackBtnTips: Object,
    mountDragBall: Boolean,
  },
  data() {
    return {
      deviceLandscape: false,

      // 悬浮球被遮挡的百分比
      ballOffsetPer: 0,
      // 停靠在上下边的高度百分比阈值
      topBottomThreshold: 0.1,
      // 超出此阈值，返回按钮停靠在悬浮球下方
      changeBackBtnDirectionThreshold: 0.15,

      tipsAnimationMsg: {
        visible: false,
        name: '',
        closeResolve() {},
        closeTimer: undefined,
      },
      iconAnimationMsg: {
        visible: false,
        animationPlayState: 'paused',
        closeTimer: undefined,
      },
      // 展示默认的悬浮球贴图
      showDefaultBg: true,

      isDragging: false,
      // 偏移
      inset: {
        left: 0,
        top: 0,
      },
      // 移动
      move: {},
      // 位置
      position: {
        left: 0,
        top: 0,
      },
      // 初始位置
      positionOld: {},
      startTime: null,
      endTime: null,
      tipsDirection: '',
      backBtnDirection: 'top',
      transitionProperty: '',
      setTimer: null,

      floatContent: {},
    }
  },
  watch: {
    osLandscape: {
      immediate: true,
      handler(val) {
        this.orientationSetData(this.deviceLandscape, val)
        this.$emit('showBackBtnTips')
      },
    },
    deviceLandscape: {
      immediate: true,
      handler(val) {
        clearTimeout(this.setTimer)
        this.setTimer = setTimeout(() => {
          this.orientationSetData(val, this.osLandscape)
        }, 800)
      },
    },

    mountDragBall: {
      immediate: true,
      handler() {
        this.$emit('showBackBtnTips')
      },
    },
  },
  computed: {
    dragBall() {
      return this.$refs.dragBall
    },
    defaultBallBg() {
      return (
        this.appInfo.floatConfig?.floatImgUrl ||
        [undefined, ballBgS, ballBgG][this.flowStyle]
      )
    },
  },
  mounted() {
    this.calcContent()
    this.addMouseListener()
  },
  beforeDestroy() {
    listener.remove(document, 'onmousemove', this._onmousemove)
    listener.remove(document, 'onmouseup', this._onmouseup)
  },
  methods: {
    onBackBtnLoad() {
      setTimeout(() => this.$emit('showBackBtnTips'), 2000)
    },
    showTips(
      floatContent = {
        floatContentType: 1,
      }
    ) {
      // 窗口不可见 忽略
      if (document.visibilityState !== 'visible') return
      if (this.tipsAnimationMsg.visible) {
        return this.closeTips().then(() => this.showTips(floatContent))
      }
      if (this.tipsAnimationMsg.closeTimer)
        clearTimeout(this.tipsAnimationMsg.closeTimer)
      if (this.iconAnimationMsg.closeTimer)
        clearTimeout(this.iconAnimationMsg.closeTimer)

      this.floatContent = floatContent
      this.calcContent()

      this.dragBall.style.opacity = 1

      this.showDefaultBg = false
      this.iconAnimationMsg.visible = true

      // 开始动画
      this.tipsAnimationMsg.name = 'show'
      this.tipsAnimationMsg.visible = true
    },
    closeTips() {
      if (!this.tipsAnimationMsg.visible) return Promise.resolve()

      this.dragBall.style.opacity = 1
      this.tipsAnimationMsg.name = 'close'
      this.tipsAnimationMsg.visible = true

      return new Promise(
        (resolve) => (this.tipsAnimationMsg.closeResolve = resolve)
      )
    },
    onTipsAnimationEnd(e) {
      if (/content_animate_reverse/.test(e.animationName)) {
        this.dragBall.style.opacity = 0.6

        this.tipsAnimationMsg.name = ''
        this.tipsAnimationMsg.visible = false

        this.tipsAnimationMsg?.closeResolve()

        this.iconAnimationMsg.closeTimer = setTimeout(this.startScaleOut, 1000)
      } else {
        this.tipsAnimationMsg.closeTimer = setTimeout(
          this.closeTips,
          (this.floatContent.contentDuration ?? 4) * 1000
        )
      }
    },
    startScaleOut() {
      if (!this.iconAnimationMsg.visible) return
      this.showDefaultBg = true
      this.iconAnimationMsg = {
        visible: true,
        animationPlayState: 'running',
      }
    },
    onScaleOutEnd() {
      if (this.tipsAnimationMsg.visible) return
      this.floatContent = {}
      this.iconAnimationMsg = {
        visible: false,
        animationPlayState: 'paused',
      }
    },

    calcContent() {
      this.calcTipsDirection()
      this.calcBackBtnDirection()
    },
    // 计算展开内容方向
    calcTipsDirection() {
      const styles = getComputedStyle(this.dragBall)
      let a, b
      if (this.osLandscape) {
        a = parseInt(styles.top)
        b = window.innerHeight
      } else {
        a = parseInt(styles.left)
        b = window.innerWidth
      }
      if (a <= b / 2) {
        this.tipsDirection = 'right'
      } else {
        this.tipsDirection = 'left'
      }
    },
    // 计算返回按钮方向
    calcBackBtnDirection() {
      const styles = getComputedStyle(this.dragBall)
      let a, b
      if (this.osLandscape) {
        a = parseInt(styles.right)
        b = window.innerWidth
      } else {
        a = parseInt(styles.top)
        b = window.innerHeight
      }

      // 按钮大小
      // 目前假设为1rem
      const backBtnSize =
        1 *
        parseFloat(getComputedStyle(document.querySelector('html')).fontSize)
      if (a <= backBtnSize) {
        this.backBtnDirection = 'bottom'
      } else if (b - a - backBtnSize <= backBtnSize) {
        this.backBtnDirection = 'top'
      }
    },
    // 计算返回按钮位置
    calcBackBtnPosition() {
      // 悬浮球大小
      // 目前假设为1rem
      const backBtnSize =
        1 *
        parseFloat(getComputedStyle(document.querySelector('html')).fontSize)

      let { left, top } = getComputedStyle(this.dragBall)

      left = parseFloat(left)
      top = parseFloat(top)

      if (this.mountDragBall) {
        if (this.backBtnDirection == 'top') {
          if (this.osLandscape) {
            left += backBtnSize
          } else {
            top -= backBtnSize
          }
        } else if (this.backBtnDirection == 'bottom') {
          if (this.osLandscape) {
            left -= backBtnSize
          } else {
            top += backBtnSize
          }
        }
      }

      return { left, top }
    },

    addMouseListener() {
      const isTouch =
        'ontouchstart' in window ||
        navigator.MaxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
      if (isTouch) {
        return
      }
      this._onmousemove = (e) => {
        this.touchmove(e)
      }
      this._onmouseup = (e) => {
        this.touchend(e)
      }
      listener.add(document, 'onmousemove', this._onmousemove)
      listener.add(document, 'onmouseup', this._onmouseup)
    },
    touchstart(e) {
      // this.$report({
      //   appId: this.id,
      //   actionType: 0,
      //   event: '点击“悬浮球”',
      // })
      // this.$report({
      //   appId: this.id,
      //   actionType: 0,
      //   event: '悬浮球_时延和丢包率曝光量',
      // })
      // this.$report({
      //   appId: this.id,
      //   actionType: 0,
      //   event: '悬浮球_应用信息曝光量',
      // })

      this.dragBall.style.opacity = 1
      this.dragBall.style.transition = 'none'
      if (!this.isDragging) {
        this.startTime = e.timeStamp
        this.positionOld = this.getPosition(this.dragBall)
        this.position = { ...this.positionOld }
        const point = e.targetTouches ? e.targetTouches[0] : e
        this.inset = {
          left: point.clientX - this.positionOld.left,
          top: point.clientY - this.positionOld.top,
        }
        this.isDragging = true
      }
    },
    touchmove(e) {
      this.dragBall.style.opacity = 1
      if (this.isDragging) {
        const point = e.targetTouches ? e.targetTouches[0] : e
        let left = point.clientX - this.inset.left
        let top = point.clientY - this.inset.top
        if (left < 0) {
          left = 0
        } else if (left > window.innerWidth - this.dragBall.offsetWidth) {
          left = window.innerWidth - this.dragBall.offsetWidth
        }
        if (top < 0) {
          top = 0
        } else if (top > window.innerHeight - this.dragBall.offsetHeight) {
          top = window.innerHeight - this.dragBall.offsetHeight
        }

        this.dragBall.style.left = left + 'px'
        this.dragBall.style.top = top + 'px'
        this.move = {
          x: left - this.positionOld.left,
          y: top - this.positionOld.top,
        }
        this.position = { left, top }
      }
    },
    touchend(e) {
      if (!this.tipsAnimationMsg.visible) this.dragBall.style.opacity = 0.6
      this.dragBall.style.transitionProperty = 'top,left,opacity'
      this.dragBall.style.transitionDuration = '0.5s,0.5s,3s'
      if (this.isDragging) {
        this.endTime = e.timeStamp
        if (
          this.endTime - this.startTime > 400 ||
          Math.abs(this.move.x) > 2 ||
          Math.abs(this.move.y) > 2
        ) {
          // 非单击事件
          let { deviceLandscape, osLandscape } = this

          // 1rem 悬浮球的大小
          let size =
            parseFloat(document.querySelector('html').style.fontSize) * 1

          // 被遮挡的偏移量
          let offsetper = this.ballOffsetPer
          let offsetpx = offsetper * size
          // 停靠上下边的阈值百分比
          let threshold = this.topBottomThreshold

          let ww = window.innerWidth
          let wh = window.innerHeight

          if (
            (!deviceLandscape && !osLandscape) ||
            (deviceLandscape && osLandscape)
          ) {
            let ww = window.innerWidth
            let wh = window.innerHeight
            // 上边
            if (this.position.top < wh * threshold) {
              this.dragBall.style.top = 0 - offsetpx + 'px'
            }
            // 下边
            else if (this.position.top + size > wh * (1 - threshold)) {
              this.dragBall.style.top = wh - size + offsetpx + 'px'
            }
            // 右边
            else if (this.position.left + size / 2 > ww / 2) {
              this.dragBall.style.left = ww - size + offsetpx + 'px'
            }
            // 左边
            else {
              this.dragBall.style.left = -1 * offsetpx + 'px'
            }
          } else {
            // 上边
            if (this.position.left + size > ww * (1 - threshold)) {
              this.dragBall.style.left = ww - size + offsetpx + 'px'
            }
            // 下边
            else if (this.position.left < ww * threshold) {
              this.dragBall.style.left = 0 - offsetpx + 'px'
            }
            // 左边
            else if (this.position.top + size / 2 > wh / 2) {
              this.dragBall.style.top = wh - size + offsetpx + 'px'
            }
            // 右边
            else {
              this.dragBall.style.top = -1 * offsetpx + 'px'
            }
          }
        } else {
          if (e?.target?.classList?.contains('bg')) {
            this.onBallClick()
          } else if (e?.target?.classList?.contains('back_btn_img')) {
            this.onClickBackBtn()
          }
        }
        this.inset = {}
        this.move = {}
        this.position = {}
        this.isDragging = false
      }
    },

    // 如果点的是返回按钮
    onClickBackBtn() {
      this.$emit('backToForegroundapp')
    },
    // 如果点击的是球
    onBallClick() {
      // 单击事件
      this.$volcReport('levitated_sphere_click', {
        click_object: '悬浮球',
      })
      this.closeTips().then(() => {
        this.$emit('openDragballPopup', -1)
      })
    },

    // 如果点击的是条
    onTipsClick() {
      this.closeTips().then(() => {
        // 跳转类型 1-tab 2-外部链接 3-云手机融合
        switch (this.floatContent.jumpType) {
          case 1: {
            this.$emit('openDragballPopup', this.floatContent.jumpTabId)
            break
          }
          case 2: {
            const url =
              (browser.versions.ios
                ? this.floatContent.iosJumpUrl
                : this.floatContent.androidJumpUrl) ?? ''

            if (
              this.appInfo.tasteConfig.singleSignOn &&
              url.includes('{{ssoTk}}')
            ) {
              alert('jumpToActivity', url)
            } else {
              if (browser.versions.ios && browser.versions.weixin)
                window.location.href = url
              else window.open(url, '_blank')
            }
            break
          }
          case 3: {
            this.$emit('guideCloudPhone', {
              showMask: true,
            })
            break
          }
          default: {
            this.$emit('openDragballPopup', this.floatContent.jumpTabId)
            break
          }
        }
      })
    },

    getPosition(source) {
      let left = source.offsetLeft
      let top = source.offsetTop
      let current = source.offsetParent
      while (current != null) {
        left += current.offsetLeft
        top += current.offsetTop
        current = current.offsetParent
      }
      return {
        left: left,
        top: top,
      }
    },
    orientationSetData(deviceLandscape, osLandscape) {
      let w = window.innerWidth
      let h = window.innerHeight
      // 1rem
      let size = parseFloat(document.querySelector('html').style.fontSize) * 1
      let offsetper = this.ballOffsetPer
      // 设置悬浮球初始位置，设定在应用右侧
      let styObj = {}
      if (!deviceLandscape && !osLandscape) {
        styObj = {
          left: `${w - size * (1 - offsetper)}px`,
          top: window.innerHeight * 0.5 - size * 0.8 + 'px',
          transform: 'unset',
        }
      }
      if (!deviceLandscape && osLandscape) {
        styObj = {
          top: `${h - (1 - offsetper) * size}px`,
          left: window.innerWidth * 0.5 + size * 0.8 - size * 1 + 'px',
          transform: 'rotate(90deg)',
        }
      }
      if (deviceLandscape && !osLandscape) {
        styObj = {
          top: `${-offsetper * size}px`,
          left: 'calc(50% - 0.8rem)',
          transform: 'rotate(-90deg)',
        }
      }
      if (deviceLandscape && osLandscape) {
        styObj = {
          left: `${w - size * (1 - offsetper)}px`,
          top: 'calc(50% - 0.8rem)',
          transform: 'unset',
        }
      }
      this.$nextTick(() => {
        for (let key in styObj) {
          this.dragBall.style[key] = styObj[key]
        }
      })
    },
  },
}
</script>
<style lang="less" scoped>
.drag-ball {
  &.noOpacity {
    opacity: 1 !important;
  }

  @ball_size: 1rem;
  // 原图大小，有阴影别动，父元素别 overflow:hidden
  @bg_size: 1rem;

  cursor: pointer;
  position: fixed;
  z-index: 1999;
  width: @ball_size;
  height: @ball_size;
  border-radius: 50%;
  .container {
    width: 100%;
    height: 100%;
    position: relative;
    .bg {
      width: @bg_size;
      height: @bg_size;
      left: calc((@ball_size - @bg_size) / 2);
      top: calc((@ball_size - @bg_size) / 2);
      position: absolute;
      z-index: 2;
      background-size: 100% 100%;
      background-position: center center;
      background-repeat: no-repeat;
      &.advertise {
        z-index: 3;
        animation-play-state: paused;
        animation-name: scale_out;
        animation-duration: 0.5s;
        animation-direction: normal;
        animation-fill-mode: backwards;
        animation-iteration-count: 1;
        animation-timing-function: ease-in;
        animation-delay: 0s;

        @keyframes scale_out {
          to {
            background-size: 0 0;
          }
        }
      }
    }
    .tips {
      position: absolute;
      z-index: 1;
      top: 0;
      bottom: 0;
      right: 50%;
      margin: auto 0;
      width: 0;
      height: 100%;
      display: flex;

      @keyframes content_animate {
        0% {
          width: 0;
        }
        100% {
          width: 200px;
        }
      }
      @keyframes content_animate_reverse {
        0% {
          width: 200px;
        }
        100% {
          width: 0;
        }
      }
      @keyframes content_animate_advertise {
        0% {
          width: 0;
        }
        100% {
          width: 245px;
        }
      }
      @keyframes content_animate_reverse_advertise {
        0% {
          width: 245px;
        }
        100% {
          width: 0;
        }
      }

      animation-duration: 0.5s;
      animation-timing-function: ease-in-out;
      animation-fill-mode: forwards;

      &.show {
        &.type1 {
          animation-name: content_animate;
        }
        &.type2 {
          animation-name: content_animate_advertise;
        }
        span {
          animation-direction: normal;
          animation-delay: 0.4s;
        }
      }
      &.close {
        &.type1 {
          animation-name: content_animate_reverse;
        }
        &.type2 {
          animation-name: content_animate_reverse_advertise;
        }
        span {
          animation-direction: reverse;
          animation-delay: 0s;
        }
      }

      &.left {
        right: 50%;
      }
      &.right {
        left: 50%;
        flex-direction: row-reverse;
        .content {
          background-position: right center;
        }
      }

      .content {
        width: 90%;
        height: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url('~@/assets/img/dragball_new/sphere-tips-bg.png');
        background-position: left center;
        background-size: cover;
        background-repeat: no-repeat;

        span {
          opacity: 0;
          font-size: 0.24rem;
          font-weight: bold;
          color: #092b64;
          white-space: nowrap;
          @supports (background-clip: text) {
            color: transparent;
            background-clip: text;
            background-image: linear-gradient(95deg, #094d46 3%, #092b64 99%);
          }

          @keyframes text_animate {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          animation-name: text_animate;
          animation-duration: 0.1s;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
      }

      .close_btn {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #000;
        width: 10%;
        height: 100%;
        img {
          width: 0.4rem;
          height: 0.4rem;
        }
      }
    }
    .back_btn {
      overflow: hidden;
      position: absolute;
      z-index: 1;
      left: 0;
      right: 0;

      width: 100%;
      height: 100%;
      border-radius: 50%;
      padding: 0.05rem;
      border: 0.05rem solid #fff;
      box-sizing: border-box;
      background-color: #fff;
      background-clip: content-box;

      transition: top linear 0.2s;
      display: flex;
      justify-content: center;
      align-items: center;

      &.top {
        top: -100%;
      }
      &.bottom {
        top: 100%;
      }

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        display: block;
      }
    }
  }

  &[flowStyle='1'] {
    .container {
      .tips {
        &.right.type1 {
          .content {
            transform: scaleX(-1);
            background-position: left center;
            span {
              transform: scaleX(-1);
            }
          }
        }
      }
    }
  }

  &[flowStyle='2'] {
    .container {
      .content {
        background-image: url('~@/assets/img/dragball_new/sphere-tips-bg-game.png');
        span {
          color: #f7f9d7;
          font-weight: normal;

          @supports (background-clip: text) {
            color: transparent;
            background-clip: text;
            background-image: linear-gradient(95deg, #f7f9d7 0%, #feffee 98%);
          }
        }
      }
    }
  }
}
</style>
