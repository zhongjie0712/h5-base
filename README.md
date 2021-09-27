# h5-base
</br>


## 简介

- Dooffe 钟杰 2021/08/24

- 主要技术栈：  vue-cli 4.x + webpack 4 + Vant UI + scss + fastmock

> vue-cli 4.x 框架： <https://cli.vuejs.org/>
> 
> webpack 4 ：<https://www.webpackjs.com/>
> 
> Vant UI 组件：<https://youzan.github.io/vant/#/zh-CN/>
> 
> scss ：<https://www.sass.hk/>
> 
> fastmock 接口：<https://www.fastmock.site/#/projects>

</br>

## <span id="top">文档目录</span>
+ [ 项目目录结构 ](#directory)
+ [ 项目启动 ](#start)
+ [ 配置多环境变量](#env)
+ [ UniApp webview配置](#uni)
+ [ Rem 适配方案](#rem)
+ [ VantUI 组件按需加载](#vant)
+ [ Assets 资源目录](#assets)
   + [ scss 全局样式](#sass)
   + [ images 本地图片资源](#images)
+ [ Components 自定义组件](#comp)
+ [ Vuex 状态管理](#vuex)
+ [ utils 全局工具包 ](#utils)
+ [ Vue-router](#router)
+ [ Axios 封装及接口管理](#axios)
+ [ Webpack 4 vue.config.js 基础配置](#base)
  + [ 配置 alias 别名](#alias)
  + [ css 全局注入](#mixin)
  + [ 生产环境去掉 console](#remc)
  + [ 移动端调试工具 vConsole](#vconsole)
  + [ 配置 proxy 跨域 ](#proxy)
+ [ Eslint+Pettier 统一开发规范 ](#pettier)

</br>

## <span id="directory">项目目录</span>
```bash
┌──  dist                                       # 项目打包输出文件夹
├──  node_modules                               # 项目依赖
├──  public                                     # html模板资源
├──  src          
├──   ├── assets                                # 项目资源文件夹
├──   │    ├── images                           # 本地图片文件夹
├──   │    └── style                            # 本地css文件夹
├──   ├── components                            # 自定义组件
├──   ├── config                                # 项目环境变量
├──   ├── request                               # axios请求文件
├──   ├── router                                # 路由管理
├──   ├── store                                 # vuex管理
├──   ├── utils                                 # 常用工具类
├──   ├── views                                 # 页面
├──   ├── App.vue                               # vue入口
├──   └── main.js                               # 项目入口
├── .env.dev                                    # 开发环境变量
├── .env.production                             # 生产环境变量
├── .env.test                                   # 测试环境变量
├── .eslintrc.js                                # Eslint 代码检查
├── .prettierrc.js                              # 统一代码风格
├── .postcssrc.js                               # rem适配
├──  babel.config.js                            # beble 编译
├──  package.json                               # 项目管理JSON
├──  README.md                                  # 文档
└──  vue.config.js                              # 项目配置文件
```
</br>

## <span id="start">启动项目</span>

```
git clone https://git.dooffe.net/HuNanBank/HN_wx_webview.git

cd HN_wx_webview

npm install

npm run serve:dev
```

</br>

## <span id="env">配置多环境变量</span>
`package.json` 里的 `scripts` 配置 `serve`, `build`，通过 `--mode xxx` 来执行不同环境

- 通过 `npm run serve:dev` 启动本地 , 执行 `development`
- 通过 `npm run build:dev` 启动打包 , 执行 `development`
  
- 通过 `npm run serve:prd` 启动本地 , 执行 `production`
- 通过 `npm run build:prd` 启动打包 , 执行 `production`

```javascript
"scripts": {
    "serve:dev": "vue-cli-service serve --mode dev",
    "build:dev": "vue-cli-service build --mode dev",
    "serve:test": "vue-cli-service serve --mode test",
    "build:test": "vue-cli-service build --mode test",
    "serve:prd": "vue-cli-service serve --mode production",
    "build:prd": "vue-cli-service build --mode production"
}
```

### 配置介绍

>以 `VUE_APP_` 开头的变量，在代码中可以通过 `process.env.VUE_APP_` 访问;  
>比如：`VUE_APP_ENV = 'development'` 通过`process.env.VUE_APP_ENV` 访问;  
>除了 `VUE_APP_*` 变量之外，在你的应用代码中始终可用的还有两个特殊的变量`NODE_ENV` 和`BASE_URL`

在项目根目录中新建`.env.xxx`

- .env.dev 本地开发环境配置

```bash
NODE_ENV='development'
# must start with VUE_APP_
VUE_APP_ENV = 'dev'
```

- .env.test 测试环境配置

```bash
NODE_ENV='development'
# must start with VUE_APP_
VUE_APP_ENV = 'test'
```

- .env.production 正式环境配置

```bash
NODE_ENV='production'
# must start with VUE_APP_
VUE_APP_ENV = 'production'
```

这里我们并没有定义很多变量，只定义了基础的 VUE_APP_ENV `dev` `test` `production`  
变量我们统一在 `src/config/env.*.js` 里进行管理。

config/index.js

```javascript
// 根据环境引入不同配置 process.env.NODE_ENV
const config = require('./env.' + process.env.VUE_APP_ENV)
module.exports = config
```

配置对应环境的变量，拿本地环境文件 `env.dev.js` 举例，用户可以根据需求修改

```javascript
// 本地环境配置
module.exports = {
  baseUrl: 'http://localhost:9527', // 项目地址
  BASE_URL: 'https://dev.xxx.com/api', // 本地api请求地址
}
```

根据环境不同，变量就会不同了

```javascript
// 根据环境不同引入不同BASE_URL地址
import {BASE_URL} from '@/config'
console.log(BASE_URL)
```

[▲ 回顶部](#top)

</br>

## <s id="uni"> UniApp webview配置 </s>
引入SDK链接
```javascript
<!--  微信小程序 JS-SDK -->
<script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.4.0.js"></script>
<!-- uni 的 SDK -->
<script type="text/javascript" src="https://js.cdn.aliyun.dcloud.net.cn/dev/uni-app/uni.webview.1.5.2.js"></script>
```

通信
```javascript
<script>
	  document.addEventListener('UniAppJSBridgeReady', function() {
        uni.getEnv(function(res) {
            console.log('当前环境：' + JSON.stringify(res));
        });
        uni.postMessage({
          data: {
             action: 'message'
          }
        });
    });
</script>
```
[▲ 回顶部](#top)

</br>


## <span id="rem">  Viewport 的适配方案 </span>

Vant 默认使用 px 作为样式单位，如果需要使用 viewport 单位 (vw, vh, vmin, vmax)，推荐使用 postcss-px-to-viewport 进行转换。

- [postcss-px-to-viewport](https://github.com/evrone/postcss-px-to-viewport) 是一款 PostCSS 插件，用于将 px 单位转化为 vw/vh 单位。

Tips: 在配置 postcss-loader 时，应避免 ignore node_modules 目录，否则将导致 Vant 样式无法被编译。

#### postcssrc 配置

下面提供了一份基本的 `.postcssrc` 配置，本项目以宽度 750 为基准，可以在此配置的基础上根据项目需求进行修改：

```javascript
const path = require('path')

// vant 按375,其他以蓝湖750为主
module.exports = ({ file }) => {
  const designWidth = file.dirname.includes(path.join('node_modules', 'vant')) ? 375 : 750

  return {
    plugins: {
      autoprefixer: {},
      'postcss-px-to-viewport': {
        unitToConvert: 'px',
        viewportWidth: designWidth
      }
    }
  }
}

```

[▲ 回顶部](#top)

</br>

## <span id="vant"> VantUI 组件按需加载 </span>

项目采
用[Vant 自动按需引入组件 (推荐)](https://youzan.github.io/vant/#/zh-CN/quickstart#fang-shi-yi.-zi-dong-an-xu-yin-ru-zu-jian-tui-jian)下
面安装插件介绍：

[babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 是一款 `babel` 插件，它会在编译过程中将
`import` 的写法自动转换为按需引入的方式

#### 安装插件

```bash
npm i babel-plugin-import -D
```

在` babel.config.js` 设置

```javascript
// 对于使用 babel7 的用户，可以在 babel.config.js 中配置
const plugins = [
  [
    'import',
    {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true  //这种方式需要安装 less-loader
    },
    'vant'
  ]
]
```

#### 统一管理 vant 组件

项目在 `src/assets/js/vant-load.js` 下统一管理组件，用哪个引入哪个，无需在页面里重复引用。

```javascript
import Vue from 'vue'
import { Button ,Toast } from 'vant'
const vantComponentArr = [Button,Toast ]
vantComponentArr.reduce((pre, cur) => pre.use(cur), Vue)
```

[▲ 回顶部](#top)

</br>

## <span id="assets"> Assets 资源目录</span> 

### <span id="sass"> scss 全局样式</span>

#### 目录结构

所有全局样式都在 `@/assets/style` 目录下设置

```bash
├── assets
│     ├── style
│     │     ├── index.scss               # 全局通用样式
│     │     ├── resetVant.scss           # vant UI 样式重置
│     │     └── variables.scss           # 全局变量
```
更多优化配置前往:[vue.config.js 基础配置](#base)


### <span id="images"> images 本地图片资源 </span>

#### 目录结构

所有image图片都在 `@/src/assets/images` 目录下设置

```bash
├── assets
│     ├── images
│     │    ├── xxx               # 对应的功能的静态图片资源文件
│     │    └── ...               
```

[▲ 回顶部](#top)

</br>


## <span id="comp">Components 自定义组件</span>
命名规则：component + '-' + 组件名字

的参数及使用说明

```bash
<template>
	<div class="sms-cell">
		<div class="sms-cell-title">短信验证码</div>
		<input placeholder="请输入短信验证码" placeholder-style="color:#cbc9cc;" @input="smsValueChange" />
		<button hover-class="sms-btn-hover" plain="true" :disabled="isSmsBtnDisabled" @click="getSms">
			<div class="sms-btn-text">{{ smsBtnText }}</div>
		</button>
	</div>
</template>

<script>
/**
 * @dec      自定义获取手机验证码组件
 *
 * @children
 * @props    {String}     phone     父组件传过来的手机号
 *
 * @parent
 * @父组件需要定义ref   ref="sms"
 * @获取子组件验证码  this.$refs.sms.smsValue
 *
 * @用法
 *  import componentSms from "@/components/component-sms.vue";
 *  components: { componentSms },
 *  <component-sms :phone="phone" ref="sms"></component-sms>
 */
 </script>
```

[▲ 回顶部](#top)

</br>

## <span id="vuex"> Vuex 状态管理</span>

#### 目录结构

```bash
├── store
│     ├── modules                       # 相应功能储存模块
│     │      └── xxx.js
│     └──  index.js
```

#### 使用

```html
<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters(['userName'])
    },

    methods: {
      // Action 通过 store.dispatch 方法触发
      doDispatch() {
        this.$store.dispatch('setUserName', 'zhongjie@dooffe.com')
      }
    }
  }
</script>
```

[▲ 回顶部](#top)

</br>

### <span id="utils"> js 全局工具包 </span>

#### 目录结构

所有utils辅助工具包都在 `@/utils` 目录下设置

```bash
├── utils
│     ├── filters.js                # Vue全局过滤器
│     ├── util.js                   # 辅助方法
│     ├── validate.js               # 数据的正则验证
│     ├── wxApi.js                  # 微信api
│     └── vantLoad.js               # vant组件按需引入
```
[▲ 回顶部](#top)

</br>


## <span id="router">Vue-router </span>

本案例采用 `hash` 模式，开发者根据需求修改 `mode` `base`


前往:[vue.config.js 基础配置](#base)

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/home/index'), // 路由懒加载
    meta: {
      title: '首页', // 页面标题
      keepAlive: false, // keep-alive 标识
      islogin: false // 是否要求登录 标识
    }
  }
]

const router =
  new VueRouter({
    routes,
    scrollBehavior: () => ({y: 0})
  })

export default router()
```

更多:[Vue Router](https://router.vuejs.org/zh/)

[▲ 回顶部](#top)

</br>

## <span id="axios"> Axios 封装及接口管理</span>

`src/request/request.js` 封装 axios ,开发者需要根据后台接口做修改。

- `service.interceptors.request.use` 里可以设置请求头，比如设置 `token`
- `config.hideloading` 是在 api 文件夹下的接口参数里设置，下文会讲
- `service.interceptors.response.use` 里可以对接口返回数据处理，比如 401 删除本地信息，重新登录

```javascript
import axios from 'axios'
import {Toast} from 'vant'
// 根据环境不同引入不同api地址
import {BASE_URL} from '@/config'

/* 全局默认配置 */
const service = axios.create({
  baseURL: BASE_URL,
  timeout: 60000
})

// request 拦截器 request interceptor
service.interceptors.request.use(
  config => {
    console.log('请求拦截config', config)
    if (config.requestOption.showLoading === true) {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    }
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  res => {
    console.log('响应拦截res', res)
    Toast.clear()
    return res
  },
  error => {
    Toast.clear()
    Toast(error.message) // 网络请求错误
    return Promise.reject(error)
  }
)

export default {
   httpGet: (api, data, option) => request({ method: 'GET', api, data, option }), // get 请求
  httpPost: (api, data, option) => request({ method: 'POST', api, data, option }), // post 请求
  httpEncryptPost: ({ url, bizContent, options }) => post({ url, bizContent, options }), // post 加密请求
  upload: ({ api, formData, option }) => uploadFile({ api, formData, option }) // 文件上传file
}
```

### 接口管理

在`src/requestPorts` 文件夹下统一管理接口

- 公共请求 publicRequest.js
- 你可以建立多个模块对接接口, 比如 `home.js` 里是首页的接口

```javascript
import request from './request'

/*
 * 请将公共的请求接口写在此处；
 * 其他功能接口请创建相应的js接口文件，进行分包管理；
 *
 * 接口命名规则：小驼峰  http + 接口类型 +api名
 *
 * |  类 型 |     请求类型    |  api接口名称   |
 * |  http  | get    获取数据 |      api      |
 * |  http  | set    更新数据 |      api      |
 * |  http  | login  登录     |      api      |
 * |  http  | test   测试     |      api      |
 */
```

### 如何调用

```javascript
// 请求接口
import {getUserInfo} from '@/request/requestPorts/xxx.js'

const res = await httpTestSms()
```

[▲ 回顶部](#top)

</br>

## <span id="base"> Webpack 4 vue.config.js 配置 </span>
### 基础配置

```javascript
module.exports = {
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
   devServer: {
    port: 9527, // 端口
    open: false, // 启动后打开浏览器
    overlay: {
      //  当出现编译器错误或警告时，在浏览器中显示全屏覆盖层
      warnings: false,
      errors: true
    }
  }
}
```

### <span id="alias"> 配置 alias 别名 </span>

```javascript
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

module.exports = {
   chainWebpack: config => {
    config.resolve.alias.set('@', resolve('src'))
  },
}
```
### <span id="mixin"> css 全局注入 </span>

`vue.config.js` 配置使用 `css.loaderOptions` 选项,注入 `scss` 的  `variables` 到全局，不需要手动引入,这样向所有 Sass/Less 样式传入共享的全局变量：

```javascript
module.exports = {
  css: {
      sourceMap: false,
      loaderOptions: {
        sass: {
          prependData: ` @import "@/assets/style/variables.scss"; `
        }
      }
  }
}
```

###  <span id="remc"> 生产环境去掉 console </span>

保留了测试环境和本地环境的 `console.log`

```bash
npm install terser-webpack-plugin --save-dev
```

```javascript
const TerserJSPlugin = require('terser-webpack-plugin')

module.exports = {
  configureWebpack: {
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
  }
}
```


###   <span id="vconsole"> 移动端调试工具 vConsole </span>
development 环境下加载vConsole调试工具

```bash
npm install vconsole-webpack-plugin --save-dev
```

```javascript
const vConsolePlugin = require('vconsole-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      // vconsole 调试插件
      new vConsolePlugin({
        filter: [], // 需要过滤的入口文件
        enable: process.env.NODE_ENV !== 'production' // 生产环境为false
      })
    ]
  }
}
```


###   <span id="proxy"> 配置 proxy 跨域 </span>

如果你的项目需要跨域设置，你需要打来 `vue.config.js` `proxy` 注释 并且配置相应参数

<u>**!!!注意：你还需要将 `src/config/env.dev.js` 里的 `BASE_URL` 设置成 '/'**</u>
```javascript
module.exports = {
  devServer: {
    // ....
    proxy: {
      //配置跨域
      '/api': {
        target: 'https://test.xxx.com', // 接口的域名
        // ws: true, // 是否启用websockets
        changOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
```

```javascript
export const httpTestSms = () => request.post('/api/test')
```

### <s> 配置 externals 引入 cdn 资源 </s> &emsp; ------> 暂时不推荐

这个版本 CDN 不再引入，我测试了一下使用引入 CDN 和不使用,不使用会比使用时间少。网上不少文章测试 CDN 速度块，这个开发者可
以实际测试一下。

另外项目中使用的是公共 CDN 不稳定，域名解析也是需要时间的（如果你要使用请尽量使用同一个域名）

因为页面每次遇到`<script>`标签都会停下来解析执行，所以应该尽可能减少`<script>`标签的数量 `HTTP`请求存在一定的开销，100K
的文件比 5 个 20K 的文件下载的更快，所以较少脚本数量也是很有必要的

```javascript
const defaultSettings = require('./src/config/index.js')
const name = defaultSettings.title || 'vue mobile template'
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

// externals
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  vant: 'vant',
  axios: 'axios'
}
// CDN外链，会插入到index.html中
const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: []
  },
  // 生产环境
  build: {
    css: ['https://cdn.jsdelivr.net/npm/vant@2.4.7/lib/index.css'],
    js: [
      'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.1.5/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.19.2/dist/axios.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.1.2/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/vant@2.4.7/lib/index.min.js'
    ]
  }
}
module.exports = {
  configureWebpack: config => {
    config.name = name
    // 为生产环境修改配置...
    if (IS_PROD) {
      // externals
      config.externals = externals
    }
  },
  chainWebpack: config => {
    /**
     * 添加CDN参数到htmlWebpackPlugin配置中
     */
    config.plugin('html').tap(args => {
      if (IS_PROD) {
        args[0].cdn = cdn.build
      } else {
        args[0].cdn = cdn.dev
      }
      return args
    })
  }
}
```

在 public/index.html 中添加

```javascript
    <!-- 使用CDN的CSS文件 -->
    <% for (var i in
      htmlWebpackPlugin.options.cdn&&htmlWebpackPlugin.options.cdn.css) { %>
      <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="preload" as="style" />
      <link href="<%= htmlWebpackPlugin.options.cdn.css[i] %>" rel="stylesheet" />
    <% } %>
     <!-- 使用CDN加速的JS文件，配置在vue.config.js下 -->
    <% for (var i in
      htmlWebpackPlugin.options.cdn&&htmlWebpackPlugin.options.cdn.js) { %>
      <script src="<%= htmlWebpackPlugin.options.cdn.js[i] %>"></script>
    <% } %>
```

</br>

## <span id="pettier"> Eslint + Pettier 统一开发规范  </span>

VScode 安装 `eslint` `prettier` `vetur` 插件

在文件 `.prettierrc.js` 里写 属于你的 pettier 规则

 ```javascript
module.exports = {
  singleQuote: true,
  tabWidth: 2,
  printWidth: 100,
  semi: false, //行位是否使用分号，默认为true
  trailingComma: 'none', //是否使用尾逗号，有三个可选值"<none|es5|all>"
  arrowParens: 'avoid'
}
 ```
在文件 `.eslintrc.js` 里写 属于你的 Eslint 规则

```javascript
 module.exports = {
  env: {
    browser: true,
    node: true,
    es2020: true
  },
  extends: ['eslint:recommended', 'plugin:vue/essential'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: ['vue'],
  rules: {}
}
```
[▲ 回顶部](#top)

</br>

## 备注

可以此没模板，定制自己项目结构及说明