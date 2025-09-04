<template>
  <div class="container">
    <div data-no-pop-event class="banner">
      <van-swipe :autoplay="5000" indicator-color="white">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
    </div>
    <div data-no-pop-event class="kingzoom">
      <div class="content">
        12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
      </div>
    </div>
    <div data-no-pop-event class="AIshop">
      <div class="content">
        12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
      </div>
    </div>
    <div data-no-pop-event class="qukan">
      <div class="content">
        12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
      </div>
    </div>
    <div data-no-pop-event class="quwan">
      <div class="content">
        12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
      </div>
    </div>
    <div class="article">
      <van-tabs swipeable>
        <van-tab>
          <template #title> 看一看</template>
          <div class="ArticleList">ArticleList</div>
        </van-tab>
        <van-tab>
          <template #title> 看两看</template>
          <div class="ArticleList">ArticleList</div>
        </van-tab>
        <van-tab>
          <template #title> 看三看</template>
          <div class="ArticleList">ArticleList</div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
let flag = false
let startX = 0
let startY = 0

document.addEventListener(
  'touchstart',
  (e) => {
    const noPopZone = e.composedPath().find((_) => {
      return (_.dataset && _.dataset.noPopEvent) !== undefined
    })
    // let isAtRightEdge = false

    // try {
    //   const scrollLeft = noPopZone.scrollLeft
    //   const maxScrollLeft = noPopZone.scrollWidth - noPopZone.clientWidth
    //   isAtRightEdge = scrollLeft > maxScrollLeft
    // } catch (error) {
    //   error
    // }

    flag = !noPopZone
    window.parent.changeIframeEvent(flag)

    const touch = e.touches[0]
    startX = touch.pageX
    startY = touch.pageY
  },
  false
)
document.addEventListener(
  'touchend',
  (e) => {
    const touch = e.changedTouches[0]
    const endX = touch.pageX
    const endY = touch.pageY

    const deltaX = endX - startX
    const deltaY = endY - startY

    // 判断是否主要是横向滑动
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < -30) {
        console.log('👈 用户向左滑动了')
        if (flag) window.parent.changeSlide()
      } else if (deltaX > 30) {
        console.log('👉 用户向右滑动了')
      }
    }
  },
  false
)
</script>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
}

.container {
  width: 100vw;
  overflow-x: hidden;
  overflow-y: hidden;
}

.banner,
.kingzoom,
.AIshop,
.qukan,
.quwan,
.article {
  width: 100%;
  height: 150px;
  background: #000;
  margin: 0 0 2rem;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  color: #fff;
  font-size: 1rem;
}

.kingzoom {
  height: 50px;
}

.article {
  height: 500px;
}

.content {
  width: 500px;
  height: 100%;
}

.kingzoom,
.AIshop,
.qukan,
.quwan {
  overflow-x: auto;
}

.banner {
  /deep/ .van-swipe {
    width: 100% !important;
    .van-swipe-item {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.ArticleList {
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
