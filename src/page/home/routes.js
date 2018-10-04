import Home from './index'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: window.baseName + '-首页',
      isRequiedLogin: true
    }
  }
]
