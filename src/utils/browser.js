// 判断访问终端
export const browser = {
  versions: (function () {
    const u = navigator.userAgent
    const myApp = u.match(/\bmyApp\/(\S*)/)
    // const myApp = u.match(/\bMozilla\/(\S*)/);
    // const app = navigator.appVersion;
    return {
      safari: u.indexOf('Safari') > -1, // safari
      chrome: u.indexOf('Chrome') > -1, // chrome
      quark: u.indexOf('Quark') > -1, // 夸克
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
      iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      webApp: u.indexOf('Safari') === -1, // 是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, // 是否微信
      qq: u.indexOf('QQTheme') > -1, // QQ内置浏览器
      qqBrowser: u.indexOf('MQQBrowser') > -1, //是否QQ浏览器
      ucBrowser: u.indexOf('UCBrowser') > -1, //是否为UC浏览器
      myApp: myApp && myApp.length > 1, // v1.5.0-她他会应用内部
      myAppVersion: myApp && myApp.length > 1 && myApp[1], // v1.5.0-她他会应用版本号
    }
  })(),
  language: navigator.browserLanguage || navigator.language,
}
