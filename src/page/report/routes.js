import Report from './report'
import MonthlyReport from './monthly/monthly'

export const routes = [
  {
    path: '/report',
    name: 'report',
    component: Report,
    meta: {
      title: window.baseName + '-报表',
      isScrollTop: true,
      isRequiedLogin: true
    },
    children: [
      {
        path: '/report/monthly',
        name: 'monthly',
        component: MonthlyReport,
        meta: {
          title: window.baseName + '-月结报表',
          isScrollTop: true,
          isRequiedLogin: true
        }
      }
    ]
  }
]
