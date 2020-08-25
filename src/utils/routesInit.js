const _import = require('@/router/_import_' + process.env.NODE_ENV) // 获取组件的方法
import Layout from '@/layout'
/** 将router的json字符串中的component转换为组件对象 */
export function filterAsyncRouter(asyncRouterMap) {
  console.log(asyncRouterMap, 'asyncRouterMap')
  if (!asyncRouterMap) return []

  function _iter(before) {
    const after = Object.assign({}, before)
    if (after.component) {
      if (after.component === 'Layout') {
        after.component = Layout
      } else {
        after.component = _import(after.component)
      }
    }
    if (after.children && after.children.length) {
      after.children = filterAsyncRouter(after.children)
    }
    return after
  }

  return asyncRouterMap.map(_iter)
}
