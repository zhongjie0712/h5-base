import Vue from 'vue'
import VueRouter from 'vue-router'

const routeFiles = require.context('./modules', false, /\.js$/)
let routeModules = []
routeFiles.keys().forEach(key => {
  routeModules = routeModules.concat(routeFiles(key).default)
})

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue'),
    meta: { title: 'No Page!' }
  },
  ...routeModules
]

const router = new VueRouter({
  routes,
  scrollBehavior: () => ({ y: 0 })
})

router.beforeEach(async function (to, from, next) {
  document.title = to.meta.title
  next()
})

export default router
