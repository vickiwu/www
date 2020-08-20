import Vue from 'vue'

import 'normalize.css/normalize.css' //  CSS normalize

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n

import '@/styles/index.scss' // 全局CSS

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // normalize

import api from '@/api/index.js'
Vue.prototype.$api = api

/**
 * MockJs 模拟 api
 * 只在生产环境下使用，上线需删除
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
