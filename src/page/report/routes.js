import Report from './index'
import MonthlyReport from './monthly/index'

export const routes = [
  {
    path: '/report',
    name: 'report',
    component: Report,
    meta: {
      title: window.baseName + '-报表',
      isRequiedLogin: true
    },
    children: [
      {
        path: '/report/monthly',
        name: 'monthly',
        component: MonthlyReport,
        meta: {
          title: window.baseName + '-月结报表',
          isRequiedLogin: true
        }
      }
    ]
  }
]
