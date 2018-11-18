import Home from './home'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: window.baseName + '-首页',
      isScrollTop: true,
      isRequiedLogin: true
    }
  }
]
