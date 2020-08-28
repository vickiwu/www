import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress配置

const whiteList = ['/login'] // 没有重定向白名单

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)

  // 确定用户是否已登录
  const hasToken = getToken() // 从cookies中获取token

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetRoutes = store.getters.routes
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo && hasGetRoutes) {
        next()
      } else {
        try {
          // 获取用户信息 路由信息
          await store.dispatch('user/getInfo')
          await store.dispatch('permission/getRoutes', hasToken)
          router.addRoutes(hasGetRoutes)
          // 跳转到相应页面
          router.replace(to.path)
          next()
        } catch (error) {
          // 删除令牌并进入登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || '系统出错，将重新登录')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 没有token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单中，直接进入
      next()
    } else {
      // 其他无权访问的页面将被重定向到登录页面。
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
