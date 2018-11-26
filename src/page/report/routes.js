import Report from './report'
import CloseReport from './close/close'
import DepostiReport from './deposit/deposit'
import EquityReport from './equity/equity'
import MonthlyReport from './monthly/monthly'
import OpenReport from './open/open'
import ProfitLossReport from './profit-loss/profit-loss'
import TransactionReport from './transaction/transaction'
import Turnover from './turnover/turnover'

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
          isRequiedLogin: true,
          requirePermission: true,
          reportField: 'MonthlySummary'
        }
      },
      {
        path: '/report/profit-loss',
        name: 'profit-loss',
        component: ProfitLossReport,
        meta: {
          title: window.baseName + '-盈亏报表',
          isRequiedLogin: true,
          requirePermission: true,
          reportField: 'PLSummary'
        }
      },
      {
        path: '/report/equity',
        name: 'equity',
        component: EquityReport,
        meta: {
          title: window.baseName + '-净值报表',
          isRequiedLogin: true,
          requirePermission: true,
          reportField: 'EquitySummary'
        }
      },
      {
        path: '/report/transaction',
        name: 'transaction',
        component: TransactionReport,
        meta: {
          title: window.baseName + '-交易清单',
          isRequiedLogin: true,
          requirePermission: true,
          reportField: 'ConfirmationQuery'
        }
      },
      {
        path: '/report/open',
        name: 'open',
        component: OpenReport,
        meta: {
          title: window.baseName + '-未平仓报表',
          isRequiedLogin: true,
          requirePermission: true,
          reportField: 'OpenPositionSummary'
        }
      },
      {
        path: '/report/close',
        name: 'close',
        component: CloseReport,
        meta: {
          title: window.baseName + '-已平仓报表',
          isRequiedLogin: true,
          requirePermission: true,
          reportField: 'CloseTradesSummary'
        }
      },
      {
        path: '/report/deposit',
        name: 'deposit',
        component: DepostiReport,
        meta: {
          title: window.baseName + '-存取款报表',
          isRequiedLogin: true,
          requirePermission: true,
          reportField: 'DepositWithdrawSummary'
        }
      },
      {
        path: '/report/turnover',
        name: 'turnover',
        component: Turnover,
        meta: {
          title: window.baseName + '-交易量报表',
          isRequiedLogin: true,
          requirePermission: true,
          reportField: 'TurnOverSummary'
        }
      }
    ]
  }
]
