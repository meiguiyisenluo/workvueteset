<template>
  <div class="container">
    <img class="back" src="@/assets/img/01.png" alt="" />
    <p class="shui">{{ shui }}元</p>
    <p class="salary">{{ salary }}元</p>
    <div class="list">
      <div v-for="item in list" :key="item" class="item">
        <p class="firm" v-show="item.firm"></p>
        <p class="shui">{{ item.shui }}元</p>
        <p class="salary">{{ item.salary }}元</p>
        <p class="month">
          <span class="year">{{ year }}</span>
          <span class="dash">-</span>
          <span class="num">{{ item.month }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
// 414 * 896
export default {
  data() {
    return {
      salary: '146000.00',
      shui: '6417.76',
      year: '2025',
      list: [
        {
          month: '01',
          salary: '14600.00',
          shui: '268.13',
        },
        {
          month: '02',
          salary: '14600.00',
          shui: '268.13',
        },
        {
          month: '03',
          salary: '14600.00',
          shui: '268.13',
        },
        {
          month: '04',
          salary: '14600.00',
          shui: '268.13',
        },
        {
          month: '05',
          salary: '14600.00',
          shui: '876.35',
        },
        {
          month: '06',
          salary: '14600.00',
          shui: '893.78',
        },
        {
          month: '07',
          salary: '14600.00',
          shui: '893.78',
          firm: '广东知一数据有限公司',
        },
        {
          month: '08',
          salary: '14600.00',
          shui: '893.78',
          firm: '广东知一数据有限公司',
        },
        {
          month: '09',
          salary: '14600.00',
          shui: '893.78',
          firm: '广东知一数据有限公司',
        },
        {
          month: '10',
          salary: '14600.00',
          shui: '893.78',
          firm: '广东知一数据有限公司',
        },
        {
          month: '11',
          salary: '14600.00',
          shui: '893.78',
          firm: '广东知一数据有限公司',
        },
        {
          month: '12',
          salary: '14600.00',
          shui: '893.78',
          firm: '广东知一数据有限公司',
        },
      ].reverse(),
    }
  },
}
</script>

<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  position: relative;
  & > p {
    padding: 0;
    margin: 0;
    position: absolute;
    z-index: 1;

    font-size: 18px;
    color: #372d2d;
    // font-weight: 400;
    &.salary {
      right: 0;
      top: 0;
    }
  }
  .back {
    z-index: 1;
    position: absolute;
    left: 0;
    top: -50px;
    width: 100%;
    height: auto;
  }
  .list {
    z-index: 10;
    position: absolute;
    left: 0;
    bottom: 0;
    background: #f4f6f9;
    width: 100%;
    height: calc(100% - 160px);
    overflow-y: auto;
    .item {
      margin-bottom: 5px;
      position: relative;
      width: 100%;
      height: 179px;
      background-image: url(~@/assets/img/01.png);
      background-position: 0 -217px;
      background-size: 100%;
      background-repeat: no-repeat;
      p {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif sans-serif;
        margin: 0;
        padding: 0 100px 0 0;
        background-color: #fff;
        font-size: 16px;
        color: #959cab;
        position: absolute;
        &.shui {
          left: 113px;
          top: 138px;
        }
        &.salary {
          left: 66px;
          top: 110px;
        }
        &.firm {
          left: 110px;
          top: 78px;

          width: 103px;
          height: 30px;

          background-image: url(~@/assets/img/02.png);
          background-position: -110px -295px;
          background-size: 414px;
          background-repeat: no-repeat;
        }
        &.month {
          font-size: 18px;
          left: 289px;
          top: 21px;
          padding: 0 10px 0 0;
          display: flex;
          align-items: center;
          color: #372d2d;
          .year {
            letter-spacing: 1px;
          }
          .dash {
            margin-bottom: 1px;
          }
        }
      }
    }
  }
}
</style>
