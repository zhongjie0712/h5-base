const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const TerserJSPlugin = require('terser-webpack-plugin')
const vConsolePlugin = require('vconsole-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

// const webpack = require('webpack')

module.exports = {
  publicPath: './',
  assetsDir: 'static',
  productionSourceMap: false,
  chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
  },
  css: {
    sourceMap: false,
    loaderOptions: {
      sass: {
        prependData: ` @import "@/assets/style/index.scss"; `
      },
      less: {
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            '@green': '#00b893'
          }
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      // 版权声明
      // new webpack.BannerPlugin(' make 2021 by zhongjie@dooffe.com  '),
      // 对html引入js文件添加hash值，解决webview缓存问题
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        hash: true
      }),
      // vconsole 调试插件
      new vConsolePlugin({
        filter: [], // 需要过滤的入口文件
        enable: process.env.NODE_ENV !== 'production' // 生产环境为false
      }),
      // 开启gzip加速
      new CompressionPlugin({
        threshold: 10240,
        test: /\.js$|\.css$/,
        deleteOriginalAssets: false
      })
    ],
    optimization: {
      //去除生产环境的console
      minimizer: [
        new TerserJSPlugin({
          terserOptions: {
            warnings: false,
            compress: {
              pure_funcs: ['console.log', 'console.debug'] //移除console
            }
          }
        })
      ]
    }
  },
  devServer: {
    port: 9527, // 端口
    open: false, // 启动后打开浏览器
    overlay: {
      //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      warnings: false,
      errors: true
    },
    disableHostCheck: true
    // proxy: {
    //   '/pre': {
    //     target: 'http://223.72.214.59/pre',
    //     ws: true,
    //     changeOrigin: true
    //   }
    // }
  }
}
