import { getRoutesApi } from '@/api/user'
import { constantRoutes } from '@/router'
import router from '@/router'
import { filterAsyncRouter } from '@/utils/routesInit'
console.log(router, 'dddd')
const state = {
  routes: [],
  addRoutes: [],
  currentRoutes: {}
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    // 添加到router当中
    state.routes.push(
      { path: '*', redirect: '/404', hidden: true }
    )
    router.addRoutes(state.routes)
  },
  SET_CURRENT_ROUTES: (state, routes) => {
    state.currentRoutes = routes
  }
}
const actions = {

  getRoutes({ commit }, token) {
    return new Promise((resolve, reject) => {
      getRoutesApi(token).then(response => {
        const { data } = response

        if (!data) {
          reject('路由信息无，请联系后台')
        }

        const { routes } = data
        // 转换组件对象
        var getRouter = filterAsyncRouter(routes)
        commit('SET_ROUTES', getRouter)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
