import { action, observable, computed } from 'mobx'

import { getPermission } from '../request/public'
import { menuListConfig } from '../config/menu-list-config'

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

  @computed get homePermissionMenu() {
    return menuListConfig.filter(item => {
      if (item.reportField && item.isShow) {
        // 各个报表菜单入口
        return this.report[item.reportField]
      } else if (item.agentField && item.isShow) {
        // 会员管理菜单入口
        // 会员管理入口显示只有当前端权限与后台权限有一对都为true时才显示
        let isHadSetRouteName = false
        for (let childrenItem of item.children) {
          if (
            childrenItem.isShow &&
            this.agent[childrenItem.agentField] &&
            !isHadSetRouteName
            ) {
              item.menuRouteName = childrenItem.menuRouteName
              isHadSetRouteName = true
              return true
          }
        }
      }
      return false
    })
  }

  @computed get agentPermissionMenu() {
    let agentConfig = null
    for (let item of menuListConfig) {
      if (item.agentField && item.isShow) {
        agentConfig = item
      }
    }
    return agentConfig.children.filter(item => {
      return item.agentField && item.isShow ?
        this.agent[item.agentField] :
        false
    })
  }

  @computed get reportPermissionMenu() {
    return menuListConfig.filter(item => (
      item.reportField && item.isShow ? this.report[item.reportField] : false
    ))
  }
}

export default new PermissionStore()