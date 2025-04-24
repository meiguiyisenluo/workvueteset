<template>
  <transition name="fade">
    <div
      v-show="visible"
      class="BackBtnTips"
      :osOrientation="osOrientation"
      :style="{
        background: `radial-gradient(circle at ${transPos.left}px ${transPos.top}px, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 0.45rem, rgba(0, 0, 0, 0.7) 0.45rem)`,
      }"
    >
      <div
        class="circle"
        :style="{ left: pos.left + 'px', top: pos.top + 'px' }"
      >
        <div class="container">
          <div class="bd" :class="{ right: isRight }">
            <div class="t">
              <img class="point" src="@/assets/img/back_btn/point.png" alt="" />
              <img class="dash" src="@/assets/img/back_btn/dash.png" alt="" />
              <img class="text" src="@/assets/img/back_btn/text.png" alt="" />
            </div>
            <div class="b">
              <div class="zhanwei"></div>
              <div class="btn" @click="confirm">
                <img class="text" src="@/assets/img/back_btn/know.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    osOrientation: String,
  },
  data() {
    return {
      visible: false,
      pos: {
        left: 0,
        top: 0,
      },
      isRight: false,
    }
  },
  computed: {
    transPos() {
      // 大小
      // 目前假设为1rem
      const backBtnSize =
        1.05 *
        parseFloat(getComputedStyle(document.querySelector('html')).fontSize)

      const left = this.pos.left + backBtnSize / 2
      const top = this.pos.top + backBtnSize / 2

      return {
        left,
        top,
      }
    },
  },
  methods: {
    show(pos) {
      this.visible = true
      this.pos = pos
      if (this.osOrientation == 'landscape') {
        this.isRight = this.pos.top > window.innerHeight / 2
      } else {
        this.isRight = this.pos.left > window.innerWidth / 2
      }
    },
    confirm() {
      this.visible = false
    },
  },
}
</script>
<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.BackBtnTips {
  z-index: 9999;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;

  .circle_trans {
    position: fixed;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }

  .circle {
    position: fixed;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    border: 1px dashed #fff;

    .container {
      position: relative;
      width: 100%;
      height: 100%;

      .bd {
        position: absolute;
        right: -4.9rem;
        top: -0.4rem;
        width: 5.1rem;
        .t {
          width: 100%;
          display: flex;
          align-items: center;
          img {
            &.point {
              width: 0.1rem;
            }
            &.dash {
              width: 1rem;
            }
            &.text {
              width: 3rem;
              height: 1rem;
            }
          }
        }

        .b {
          display: flex;
          margin-top: 0.3rem;
          .zhanwei {
            width: 1.1rem;
          }
          .btn {
            width: 3rem;
            display: flex;
            justify-content: center;
            align-items: center;

            img {
              width: 1.5rem;
            }
          }
        }

        &.right {
          left: -4.9rem;
          .t,
          .b {
            flex-direction: row-reverse;
          }
        }
      }
    }
  }

  &[osOrientation='landscape'] {
    .circle {
      transform: rotateZ(90deg);
    }
  }
}
</style>
