import { getRoutesApi } from '@/api/user'
import { constantRoutes } from '@/router'

const state = {
  routes: [],
  addRoutes: [],
  currentRoutes: {}
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
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
        console.log(routes, 'routesroutes')

        commit('SET_ROUTES', routes)
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
