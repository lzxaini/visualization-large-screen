const { defineConfig } = require('@vue/cli-service')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 公共路径(必须有的，不然打包css和js路径问题不加载)
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // 静态资源存放的文件夹(相对于ouputDir)
  assetsDir: 'assets',
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            [
              'postcss-px-to-viewport-8-plugin',
              {
                unitToConvert: 'px', // 需要转换的单位，默认为"px"
                viewportWidth: 4800, // 视窗的宽度，对应pc设计稿的宽度，一般是1920(开发的大屏2880*1056)
                viewportHeight: 1760,// 视窗的高度，对应的是我们设计稿的高度
                unitPrecision: 6, // 单位转换后保留的精度
                propList: [
                  // 能转化为vw的属性列表
                  '*'
                ],
                viewportUnit: 'vw', // 希望使用的视口单位
                fontViewportUnit: 'vw', // 字体使用的视口单位
                selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。cretae
                minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
                mediaQuery: false, // 媒体查询里的单位是否需要转换单位
                replace: true, // 是否直接更换属性值，而不添加备用属性
                exclude: /(\/|\\)(node_modules)(\/|\\)/ // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
              }
            ]
          ]
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
        '@components': resolve('src/components'),
        '@utils': resolve('src/utils'),
        '@views': resolve('src/views'),
        '@assets': resolve('src/assets')
      }
    }
  }
})
