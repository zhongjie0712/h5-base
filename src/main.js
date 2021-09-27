import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import useArr from '@/utils/use.js'
import filters from '@/utils/filters.js'

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 注册插件
useArr.reduce((pre, cur) => pre.use(cur), Vue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
