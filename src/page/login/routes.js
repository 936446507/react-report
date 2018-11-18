import Login from './login'

export const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: window.baseName + '-登录',
      isScrollTop: true,
      isRequiedLogin: false
    }
  }
]
