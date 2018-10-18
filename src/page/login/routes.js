import Login from './login'

export const routes = [
  {
    path: '/login',
    name: 'lgoin',
    component: Login,
    meta: {
      title: window.baseName + '-登录',
      isRequiedLogin: false
    }
  }
]
