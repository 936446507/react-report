export const menuListConfig = [
  {
    parentRouteName: 'memberManager',
    menuRouteName: 'agentInfo',
    menuText: '会员管理',
    agentField: 'MemberManager',
    isShow: true,
    children: [
      {
        menuRouteName: 'agentInfo',
        menuText: '代理商管理信息',
        agentField: 'AgentInfo',
        isShow: true
      },
      {
        menuRouteName: 'userInfo',
        menuText: '投资者管理',
        agentField: 'AgentInvestorList',
        isShow: true
      },
      {
        menuRouteName: 'addAgent',
        menuText: '新建代理商',
        agentField: 'AddAgent',
        isShow: false
      }
    ]
  },
  {
    parentRouteName: 'report',
    menuRouteName: 'monthly',
    menuText: '月结报表',
    reportField: 'MonthlySummary',
    isShow: true
  },
  {
    parentRouteName: 'report',
    menuRouteName: 'profit-loss',
    menuText: '盈亏报表',
    reportField: 'PLSummary',
    isShow: true
  },
  {
    parentRouteName: 'report',
    menuRouteName: 'equity',
    menuText: '净值报表',
    reportField: 'EquitySummary',
    isShow: true
  },
  {
    parentRouteName: 'report',
    menuRouteName: 'transaction',
    menuText: '交易清单',
    reportField: 'ConfirmationQuery',
    isShow: true
  },
  {
    parentRouteName: 'report',
    menuRouteName: 'open',
    menuText: '未平仓报表',
    reportField: 'OpenPositionSummary',
    isShow: true
  },
  {
    parentRouteName: 'report',
    menuRouteName: 'close',
    menuText: '已平仓报表',
    reportField: 'CloseTradesSummary',
    isShow: true
  },
  {
    parentRouteName: 'report',
    menuRouteName: 'deposit',
    menuText: '存取款报表',
    reportField: 'DepositWithdrawSummary',
    isShow: true
  },
  {
    parentRouteName: 'report',
    menuRouteName: 'turnover',
    menuText: '交易量报表',
    reportField: 'TurnOverSummary',
    isShow: true
  }
]

export default menuListConfig
