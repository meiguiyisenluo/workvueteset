const autoprefixer = require('autoprefixer')
const path = require('path')
const git = require('git-rev-sync')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  lintOnSave: process.env.NODE_ENV !== 'production',
  // 不输出为编译警告
  runtimeCompiler: true,
  transpileDependencies: ['flatted', 'vuex-persist'],
  chainWebpack: (config) => {
    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins.delete('prefetch').delete('preload')
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
    /**
     * 修改 htmlWebpackPlugin 配置中标题
     */
    config.plugin('html').tap((args) => {
      args[0].title = 'test'
      try {
        args[0].commit = git.long()
      } catch (e) {
        console.error(e)
      }
      args[0].buildTime = new Date().toLocaleString()
      return args
    })
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [autoprefixer()],
      },
      less: {},
    },
  },
  devServer: {
    // host: 'localhost',
    port: 8000,
    https: true,
    open: true, //自动启动浏览器
    hotOnly: false, // 热更新
    disableHostCheck: true,
  },
  // 第三方插件配置
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/styles/base.less')],
    },
  },
  // fix CI error: `Error: This socket has been ended by the other party`
  parallel: false,
}
