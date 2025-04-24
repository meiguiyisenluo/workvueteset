<template>
  <div>
    <DragBall
      v-show="!loading && !showCappAkskTips"
      :mountDragBall="mountDragBall"
      :id="id"
      :appInfo="appInfo"
      ref="DragBall"
      :osLandscape="osOrientation == 'landscape'"
      @openDragballPopup="openDragballPopup"
      @guideCloudPhone="guideCP"
      :flowStyle="1"
      :foregroundapp="foregroundapp"
      @backToForegroundapp="backToForegroundapp"
      @showBackBtnTips="showBackBtnTips"
      :refBackBtnTips="$refs.BackBtnTips"
    />

    <BackBtnTips ref="BackBtnTips" :osOrientation="osOrientation" />
  </div>
</template>

<script>
import DragBall from '@/components/DragBall.vue'
import BackBtnTips from '@/components/BackBtnTips.vue'
export default {
  data() {
    return {
      appInfo: {
        id: '10098',
        appName: '中国移动云盘',
        channel: 'whq',
        appShortUrl: 'https://l.yun.139.com/s/31QW5A',
        appLongUrl: 'https://plus.buy.139.com/mccloudgame/#/?i=HOMI665jch8=',
        tasteConfig: {
          packageName: 'com.chinamobile.mcloud',
          appLogoData:
            'https://plus.buy.139.com/cloudimage/dashboard/202411/1853273564225081344.jpg',
          shutoffTime: 15,
          keepLive: 0,
          liveTime: 300,
          trialAttribute: {
            limitType: 0,
            limitChangeTime: '1745288278474',
            hideReminder: false,
            trialTime: '0',
            activityFlag: 0,
            trialTimeHintFlag: 1,
          },
          locationAuth: 1,
          singleSignOn: 1,
          midPageSwitch: true,
          midPagePar:
            'https://cpactiv.buy.139.com/#/AggregationActivities?channelSrc=xinchun-yun10086&token={{ssoTk}}',
          flowStyle: 1,
          freeFlowFlag: true,
          freeFlow: {
            freeFlowType: 0,
            freeFlowLink:
              'https://cloud.139.com/freetraffic/#/apporder?token={{ssoTk}}&channelSrc=cplay',
          },
        },
        loginConfig: {
          schemeOpen: 1,
          activateApp: 0,
          delayDeliver: 0,
          schemePath:
            'mcloud://main/webView?params=eyJsaW5rVXJsIjogImh0dHBzOi8vY2FpeXVuLmZlaXhpbi4xMDA4Ni5jbjo3MDcxL3BvcnRhbC90YXNrVGVtcGxhdGUvaW5pdHZlLmh0bWw/aWQ9OXIxeWlMJm1hcmtldE5hbWU9TmF0aW9uYWxfdmFsdWVTaG9wcGluZyZ0b2tlbj0jc3NvVG9rZW4jIiwNCiJ0aXRsZSI6ICIifQ==&uid=n3az5IuzpZ2fyckaRcJH2/pDfeUCt1tswDPb2rbbdeF9lXp+cD22z77WzMRJ9QJDlC9pc6RDLfm/ViVGyY27L8WIuFGv34j+7oYc/HE6woKdEccak3CABMsGxa9Pn66Vvp7ZtjLr+xql0khoLEw/pI/bruye7N+JR17EwzAKWKB/2xzZ1/xEolFTLiNWvdvBQK5UJ9HTK6+a8UAjEhp0SjbduMagAt2Oo/sVreWBmMeILsbPAZUOAJBevy1QQjtmS2OO+MTgTaaZ5ieek/keUCd0eXLn9XQnAGDV9KYCn03IGLzkJQHo9BJ/dHcwqNgRQmVwkWQih6If1jJg0f7fng==&tk=',
          authLogin: 1,
          showPrivacy: 1,
          privacyInfo: {
            privacyTitle: '《隐私政策》',
            privacyLink:
              'https://caiyun.feixin.10086.cn:7071/portal/templateView/initve.html?id=2661&marketName=hcy_yhxy',
            userAgreementTitle: '《用户协议》',
            userAgreementLink:
              'https://caiyun.feixin.10086.cn:7071/portal/templateView/initve.html?id=143&marketName=hcy_yhxy',
            customProtocolList: [
              {
                title: '《测试1》',
                link: 'https://www.baidu.com',
              },
              {
                title: '《测试2》',
                link: 'https://www.baidu.com',
              },
              {
                title: '《测试3》',
                link: 'https://www.baidu.com',
              },
              {
                title: '《测试4》',
                link: 'https://www.baidu.com',
              },
              {
                title: '《测试5》',
                link: 'https://www.baidu.com',
              },
            ],
          },
          loginHome: {
            config: 1,
            name: '中国移动云盘',
            icon: 'https://plus.buy.139.com/cloudimage/dashboard/202407/1813387758077612032.jpg',
            welcome: '欢迎使用中国移动云盘',
          },
          loginCarousel: true,
          loginCarous: [
            {
              imageUrl:
                'https://plus.buy.139.com/cloudimage/dashboard/202411/1859427854496960512.jpg',
              jumpUrl: 'https://www.baidu.com',
            },
            {
              imageUrl:
                'https://plus.buy.139.com/cloudimage/dashboard/202411/1859431363275526144.jpg',
              jumpUrl: '',
            },
          ],
          mainLoginMethod: 1,
          firstLoginPageFlag: 0,
          otherLoginPageFlag: 0,
        },
        marketConfig: {
          toastSw: true,
          toast: '欢迎使用中国移动云盘',
          marketToast: {
            toastSw: 1,
            imgUrl:
              'https://plus.buy.139.com/cloudimage/dashboard/202411/1862329915408519168.jpg',
            jumpUrl: '',
          },
          topMarketOpen: 0,
          marketTop: {
            topMarketType: 2,
            topMarketImg: '',
            topMarketUrl: '',
          },
          giftSw: 0,
          marketGift: {
            giftText: '新春活动',
            giftLink:
              'https://cpactiv.buy.139.com/#/AggregationActivities?channelSrc=xinchun-yun10086&token={{ssoTk}}',
            giftIcon:
              'https://plus.buy.139.com/cloudimage/dashboard/202410/1846436241499885568.png',
            giftIconType: 1,
          },
          marketMinute: {
            minSw: true,
            minText: '下载APP',
            minAndroidLink: 'https://www.jd.com',
            minIosLink: 'https://www.jd.com',
          },
          marketMinuteGuideSw: 1,
          marketPeriod: {
            periodSw: true,
            periodList: [
              {
                hour: 0,
                minute: 0,
                second: 15,
                toastText: '15秒弹窗',
                buttonSw: true,
                buttonText: '百度一下1@#a',
                androidLink: 'https://www.baidu.com',
                iosLink: 'https://www.baidu.com',
              },
            ],
          },
          marketPeriodGuideSw: 1,
          sampleSw: 0,
          marketSample: {},
          marketSampleGuideSw: 1,
          pubSw: false,
          marketPublic: {
            pubMbSw: 1,
            title: '点点点',
            buttonTes: '吊袜带',
            qrUrl:
              'https://plus.buy.139.com/cloudimage/dashboard/202410/1846444862010953728.png',
            rubric: '的娃娃热热啊啊付大完蛋啊打啊缝纫工',
          },
          marketPublicGuideSw: 1,
        },
        baseConfig: {
          appName: '中国移动云盘',
          appBrief: '安全、长久、免流、不限速、大空间的云盘',
          appLabel: [
            '安全',
            '不限速',
            '免流',
            '测试标签数量和上限长度1',
            '测试标签数量和上限长度2',
            '测试标签数量和上限长度3',
            '测试标签数量和上限长度4',
          ],
          baseBall: {
            buttonText: '立即下载',
            androidLink: 'https://www.mi.com/',
            iosLink: 'https://www.mi.com/',
            jumpText: '立即下载客户端，体验不限时',
            appVersion: '6.3.4.x.X.1234567890',
            appIntroduction:
              '中国移动云盘是一款安全、长久、免流、不限速、大空间的云盘，为用户提供微信文件、手机图片、通讯录等手机资料备份功能；还有照片AI分类、语音实时转写笔记、精彩内容圈子、文档在线编辑等实用功能。AI工具内测重磅开放，AI帮我写、整理纪要、智能抠图、图片配文等智趣功能等你探索！ \n无惧存储空间和数据流量不足，现在登录云盘参与“云上相遇，回馈好礼”即可领取会员季卡，享受20+会员权益，还可免费领取1T个人云空间。此外，移动用户还能获得30G定向流量，更多限时活动等你来参加！\n【联系我们】\n(1)微信公众号:进入“中国移动云盘”对话框输入“客服”，接入人工客服。\n(2)微信小程序:“中国移动云盘”-我的-意见反馈。\n(3)拨打10086中国移动客服热线。\n【功能特点】\n1【不限速传输】普通用户也不限速，上传下载速度取决于用户的网络和设备\n2【云安全保护】存储传输安全加密，支持加密保险箱存储，全方位安全云服务\n3【多终端同步】支持APP、PC、Web、TV、iPad、小程序等多端、跨系统同步\n4【手机云备份】自动备份相册、音视频、微信文件等资料，轻松释放手机内存',
          },
          baseBallGuideSw: 1,
          noResourcePage: {
            tipsPage: '活动太火爆啦，先去拆个福袋领红包吧~~',
            tipsButton: '立即前往',
            iosLink:
              'https://caiyun.feixin.10086.cn:7071/portal/hcyview/index.html?path=National_AnnualRewarding&sourceid=1024&enableShare=1&token=#ssoToken#',
            androidLink:
              'https://caiyun.feixin.10086.cn:7071/portal/hcyview/index.html?path=National_AnnualRewarding&sourceid=1024&enableShare=1&token=#ssoToken#',
            midPageLink: '',
          },
          offlinePopup: {
            button: 1,
            jumpText:
              '应用已经下线啦，但精彩仍在延续！您可以点击立即下载，在本地享受更多精彩活动。',
            androidLink:
              'https://cpactiv.buy.139.com/#/AggregationActivities?channelSrc=xinchun-yun10086&token={{ssoTk}}',
            iosLink:
              'https://cpactiv.buy.139.com/#/AggregationActivities?channelSrc=xinchun-yun10086&token={{ssoTk}}',
            downloadButtonName: '',
            cancelPopup: {
              button: 1,
              androidLink:
                'https://cpactiv.buy.139.com/#/AggregationActivities?channelSrc=xinchun-yun10086&token={{ssoTk}}',
              iosLink:
                'https://cpactiv.buy.139.com/#/AggregationActivities?channelSrc=xinchun-yun10086&token={{ssoTk}}',
              buttonName: '取消一下',
            },
            closePopup: {
              button: 1,
              androidLink:
                'https://cpactiv.buy.139.com/#/AggregationActivities?channelSrc=xinchun-yun10086&token={{ssoTk}}',
              iosLink:
                'https://cpactiv.buy.139.com/#/AggregationActivities?channelSrc=xinchun-yun10086&token={{ssoTk}}',
            },
          },
          offlineShow: 1,
          codeFlag: 1,
          toB: 0,
        },
        tabConfig: {
          tabList: [
            {
              id: '1732181252857',
              provinces: ['广东'],
              tabType: 1,
              tabStyle: 1,
              tabName: '广东tab页',
              tabImgUrl: '',
              tabImgList: [
                {
                  imgUrl:
                    'https://plus.buy.139.com/cloudimage/dashboard/202411/1859529147588677632.png',
                  jumpUrl:
                    'https://cpactiv.buy.139.com/#/AggregationActivities?channelSrc=xinchun-yun10086&token={{ssoTk}}',
                },
              ],
            },
            {
              id: '1732257370951',
              provinces: ['广西'],
              tabType: 1,
              tabStyle: 1,
              tabName: '广西tab页',
              tabImgUrl: '',
              tabImgList: [
                {
                  imgUrl:
                    'https://plus.buy.139.com/cloudimage/dashboard/202411/1859848432827633664.png',
                  jumpUrl: '',
                },
              ],
            },
            {
              id: '1732849076620',
              provinces: [],
              tabType: 2,
              tabStyle: 1,
              tabImgUrl:
                'https://plus.buy.139.com/cloudimage/dashboard/202411/1862330188537401344.png',
              tabImgList: [
                {
                  imgUrl:
                    'https://plus.buy.139.com/cloudimage/dashboard/202411/1862331528458145792.png',
                  jumpUrl: '',
                },
              ],
            },
          ],
        },
        floatConfig: {
          showSwitch: 1,
          delayShowTime: 0,
          floatImgUrl:
            'https://plus.buy.139.com/cloudimage/dashboard/202412/1866756686308577280.png',
          floatContentList: [
            {
              provinces: ['广东'],
              closeButton: 0,
              useTimeConfig: {
                hour: 0,
                minute: 0,
                second: 1,
              },
              contentDuration: 20,
              floatContentType: 1,
              floatText: '引流云手机',
              activityFloatImgUrl: '',
              advertisementUrl: '',
              jumpType: 3,
              apkUrl: '',
            },
            {
              provinces: ['广西'],
              closeButton: 0,
              useTimeConfig: {
                hour: 0,
                minute: 1,
                second: 0,
              },
              contentDuration: 6,
              floatContentType: 1,
              floatText: '广西的',
              activityFloatImgUrl: '',
              advertisementUrl: '',
              jumpType: 1,
              jumpTabId: '',
            },
          ],
          remake: '',
        },
        appStatus: 0,
        wsOpen: 1,
        canPlay: 1,
        oneGrayFlag: '0',
        freeFlowFlag: '1',
        packageId: '1838872508114903042',
        packageVersion: '8.0.6',
        packageName: 'com.hunantv.imgo.activity',
        apkName: 'mangguotv.apk',
        basePlatform: '0',
      },
      id: '123',
      loading: false,
      showCappAkskTips: false,
      mountDragBall: true,
      osOrientation: 'portrait',
      foregroundapp: {},
      timingTaskList: [],
      interval: null,
      s: 0,
    }
  },
  components: { DragBall, BackBtnTips },
  methods: {
    openDragballPopup() {},
    guideCP() {},
    backToForegroundapp() {},
    async showBackBtnTips() {
      if (localStorage.showBackBtnTipsFlag) return
      localStorage.showBackBtnTipsFlag = true

      if (!this.$refs.DragBall) return

      await this.$nextTick()

      this.$refs.BackBtnTips.show(this.$refs.DragBall.calcBackBtnPosition())
    },

    // 消费计时任务
    timeExposeFn(res, timer) {
      while (
        this.timingTaskList.length &&
        timer >= this.timingTaskList[0].timing
      ) {
        this.timingTaskList.shift().task()
      }
    },
  },

  created() {
    // 悬浮球展开内容
    for (const floatContent of this.appInfo.floatConfig?.floatContentList ??
      []) {
      const { hour = 0, minute = 0, second = 0 } = floatContent.useTimeConfig
      const timing = hour * 60 * 60 + minute * 60 + second
      floatContent.timing = timing
      this.timingTaskList.push({
        timing: timing,
        task: () => {
          this.$nextTick(() => {
            this.$refs.DragBall?.showTips(floatContent)
          })
        },
      })
    }
  },

  mounted() {
    this.interval = setInterval(() => {
      this.s += 1
      this.timeExposeFn(undefined, this.s)
    }, 1000)
  },

  beforeDestroy() {
    clearInterval(this.interval)
  },
}
</script>

<style>
html {
  font-size: 50px;
}
</style>
