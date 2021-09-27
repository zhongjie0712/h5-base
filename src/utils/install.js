import { BASE_IMG, BASE_BUILD_URL } from '@/config'

// eslint-disable-next-line no-unused-vars
const install = (Vue, options = {}) => {
  /* 全局事件总线 */
  Vue.prototype.$EventBus = new Vue()
  Vue.prototype.$BASE_IMG = BASE_IMG
  Vue.prototype.$BASE_BUILD_URL = BASE_BUILD_URL
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
