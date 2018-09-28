import Login from './index'

export const routes = [
  {
    path: '/login',
    name: 'lgoin',
    component: Login,
    meta: {
      title: window.baseName + '-登录'
    }
  }
]
