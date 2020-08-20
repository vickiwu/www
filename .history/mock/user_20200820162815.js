
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: { ...token, ww: 'ssssssdsadwe' }

      }
    }
  },
  // 获取路由接口
  {
    url: '/vue-admin-template/user/routes',
    type: 'get',
    response: config => {
      const { token } = config.query

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'token无效'
        }
      }

      return {
        code: 20000,
        data: {
          'routes': [
            {
              path: '/',
              component: 'Layout',
              redirect: '/dashboard',
              children: [{
                path: 'dashboard',
                name: 'Dashboard',
                component: '/dashboard/index',
                meta: { title: 'Dashboard', icon: 'dashboard' }
              }]
            },

            {
              path: '/example',
              component: 'Layout',
              redirect: '/example/table',
              name: 'Example',
              meta: { title: 'Example', icon: 'example' },
              children: [
                {
                  path: 'table',
                  name: 'Table',
                  component: '/table/index',
                  meta: { title: 'Table', icon: 'table' }
                },
                {
                  path: 'tree',
                  name: 'Tree',
                  component: '/tree/index',
                  meta: { title: 'Tree', icon: 'tree' }
                }
              ]
            },

            {
              path: '/form',
              component: '/login/index',
              hidden: true
            },

            {
              path: '/nested',
              component: 'Layout',
              redirect: '/nested/menu2',
              name: 'Nested',
              meta: {
                title: 'Nested',
                icon: 'nested'
              },
              children: [
                {
                  path: 'menu1',
                  component: '/nested/menu1/index', // Parent router-view
                  name: 'Menu1',
                  meta: { title: 'Menu1' },
                  children: [
                    {
                      path: 'menu1-1',
                      component: '/nested/menu1/menu1-1',
                      name: 'Menu1-1',
                      meta: { title: 'Menu1-1' }
                    },
                    {
                      path: 'menu1-2',
                      component: '/nested/menu1/menu1-2',
                      name: 'Menu1-2',
                      meta: { title: 'Menu1-2' },
                      children: [
                        {
                          path: 'menu1-2-1',
                          component: '/nested/menu1/menu1-2/menu1-2-1',
                          name: 'Menu1-2-1',
                          meta: { title: 'Menu1-2-1' }
                        },
                        {
                          path: 'menu1-2-2',
                          component: '/nested/menu1/menu1-2/menu1-2-2',
                          name: 'Menu1-2-2',
                          meta: { title: 'Menu1-2-2' }
                        }
                      ]
                    },
                    {
                      path: 'menu1-3',
                      component: '/nested/menu1/menu1-3',
                      name: 'Menu1-3',
                      meta: { title: 'Menu1-3' }
                    }
                  ]
                },
                {
                  path: 'menu2',
                  component: '/nested/menu2/index',
                  meta: { title: 'menu2' }
                }
              ]
            },
            {
              path: '/logins',
              component: 'Layout',
              name: 'logins',
              redirect: '/logins/index',
              meta: {
                title: 'logins',
                icon: 'nested'
              },
              children: [
                {
                  path: '/index',
                  component: '/form/index',
                  meta: { title: '外部链接' }
                }
              ]
            },
            {
              'path': '/',
              'component': 'Layout',
              'name': 'index',
              'meta': 'null',
              'children': [
                {
                  'path': '/about',
                  'component': 'About',
                  'name': 'about',
                  'meta': {
                    'id': 640,
                    'groupId': 9,
                    'title': '节点管理',
                    'icon': 'null',
                    'display': 1,
                    'isRoute': 1
                  },
                  'children': null
                }
              ]
            }
          ]
        }

      }
    }
  },
  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
