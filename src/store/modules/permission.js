import { getRoutesApi } from '@/api/user'
import { constantRoutes } from '@/router'
import { filterAsyncRouter } from '@/utils/routesInit'
const state = {
  routes: [],
  addRoutes: [],
  currentRoutes: {}
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    console.log(constantRoutes, '11111')

    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
    console.log(state.routes, '22222')
    state.routes.push(
      { path: '*', redirect: '/404', hidden: true }
    )
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
        console.log(routes, data, 'routesroutes')
        // 转换组件对象
        var getRouter = filterAsyncRouter(routes)
        console.log(getRouter, 'getRouter')
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
