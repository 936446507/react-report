import {
  REQUEST_PERMISSION,
  RECEIVE_PERMISSION
} from '../constants/action-typs'

const initState = {
  isFetching: false,
  state: '',
  data: {
    // 代理权限
    agent: {
      AgentInfo: false,
      AgentInvestorList: false,
      AddAgent: false
    },
    // 报表权限
    report: {
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
  }
}

const getPermission = (state = initState, action) => {
  switch (action.type) {
    case REQUEST_USERINFO:
      return {
        ...state,
        isFetching: true,
        state: '',
        data: {}
      }
    case RECEIVE_USERINFO:
      return {
        ...state,
        isFetching: false,
        state: action.state,
        data: action.data
      }
    default:
      return state
  }
}

export const permission = (state = initState, action) => {
  switch (action.type) {
    case REQUEST_PERMISSION:
    case RECEIVE_PERMISSION:
      return getPermission(state, action)
    default:
      return state
  }
}
