import { action, observable, } from 'mobx'
import { getPermission } from '../request/public'

class PermissionStore {
  // 代理权限
  @observable agent = {
    AgentInfo: false,
    AgentInvestorList: false,
    AddAgent: false
  }
  // 报表权限
  @observable report = {
    CloseTradesDetailAl: false,
    CloseTradesDetailDi: false,
    CloseTradesSummary: false,
    ConfirmationQuery: false,
    DepositWithdrawDetailAl: false,
    DepositWithdrawDetailDi: false,
    DepositWithdrawSummary: false,
    EquityDetailAl: false,
    EquityDetailDi: false,
    EquitySummary: false,
    IntermedieReportSummary: false,
    MonthlyDetailAl: false,
    MonthlyDetailDi: false,
    MonthlySummary: false,
    OpenPositionDetailAl: false,
    OpenPositionDetailDi: false,
    OpenPositionSummary: false,
    PLDetailAl: false,
    PLDetailDi: false,
    PLSummary: false,
    SettleReportSummary: false,
    TurnOverDetailAl: false,
    TurnOverDetailDi: false,
    TurnOverSummary: false
  }

  @observable isLoadingPermission = false
  @observable isFirstLoadPermission = true

  @action.bound
  getPermission() {
    if (this.isLoadingPermission) return
    this.isLoadingPermission = true
    return new Promise((resolve, reject) => {
      getPermission()
        .then(e => {
          this.isLoadingPermission = false
          if (e.state === 'ok') {
            this.isFirstLoadPermission = false
            const data = e.data
            if (data.agent) {
              this.agent = data.agent
            }
            if (data.report) {
              this.report = data.report
            }
          }
          resolve(e)
        })
        .catch(err => {
          this.isLoadingPermission = false
          reject(err)
        })
    })
  }
}

export default new PermissionStore()