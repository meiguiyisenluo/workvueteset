<template>
  <div class="phone-view" id="phone-view">
    <van-popover
      v-model="showPopover"
      trigger="click"
      placement="bottom-start"
      get-container="#phone-view"
    >
      <template #reference>
        <van-button type="primary">浅色风格</van-button>
      </template>
      <template>
        <div class="phone-list">
          <div
            v-for="item in instanceList"
            :key="item.phoneId"
            class="phone-list-item"
            :class="{ active: item.phoneId == $route.query.phoneId }"
          >
            <p>
              {{ item.phoneName | phoneNameFilter(true) }}
              <van-icon name="success" />
            </p>
            <span>云机ID：{{ item.phoneId }}</span>
          </div>
        </div>
      </template>
    </van-popover>
  </div>
</template>

<script>
export default {
  created() {
    document.querySelector('html').style.fontSize = '50px'
  },
  data() {
    return {
      showPopover: false,
    }
  },

  filters: {
    phoneNameFilter(name, isVerticalScreen) {
      if (isVerticalScreen) {
        return name.length > 10 ? name.substring(0, 10) + '...' : name
      }
      return name.length > 20 ? name.substring(0, 20) + '...' : name
    },
  },
  computed: {
    instanceList() {
      // mock
      return [
        {
          phoneId: '1234567890',
          phoneName: '我的云手机',
        },
        {
          phoneId: '0987654321',
          phoneName: '我的第二台云手机',
        },
        {
          phoneId: '1122334455',
          phoneName: '我的第三台云手机',
        },
        {
          phoneId: '6677889900',
          phoneName: '我的第四台云手机',
        },
      ]
      // return Object.values(this.$store.state.phoneIdMap || {})
    },
  },
}
</script>

<style lang="less" scoped>
#phone-view {
  /deep/ .phone-list {
    max-height: 3rem;
    overflow-y: auto;
    padding: 0.1rem;
    background-color: #fff;
    .phone-list-item {
      display: flex;
      flex-direction: column;
      padding: 0.1rem;

      &.active {
        p {
          color: #0a59f7;
        }
        .van-icon {
          display: inline-block;
        }
      }

      border-bottom: 0.5px solid #00000014;
      &:nth-last-child(1) {
        border: none;
      }

      p {
        margin: 0;

        font-size: 0.32rem;
        line-height: 0.48rem;
        font-family: HarmonyOS Sans SC;
        font-weight: regular;
        color: #000000;
        letter-spacing: 0px;
        text-align: left;
      }

      span {
        color: #595959;
        font-family: HarmonyOS Sans SC;
        font-weight: regular;
        font-size: 0.2rem;
        line-height: normal;
        letter-spacing: 0px;
        text-align: left;
      }
      .van-icon {
        display: none;
        float: right;
        margin-top: 0.1rem;
        margin-left: 0.3rem;
        font-size: 0.4rem;
        color: #0a59f7;
      }
    }
  }
}
</style>
