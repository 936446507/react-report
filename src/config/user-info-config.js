const userInfoConfig = {
  balance: 'BALANCE',
  equity: 'EQUITY',
  marginFree: 'MARGIN_FREE',
  username: 'UserName',
  parentName: 'parentName',
  isAgent: 'isAgent',
  isRebateAgent: 'isRebateAgent',
  lastLoginTime: 'lastLoginTime',
  preDayrebackCommissionSelf: 'preDayrebackCommission_self',
  toDayrebackCommissionSelf: 'toDayrebackCommission_self',
  isSettleAgent: 'isSettleAgent',     // 是否结算
  agentSum: 'agentSum',
  userSum: 'userSum',
  formalUserSum: 'formalUserSum',
  totalSettling: 'totalSettling',     // 待结算金额
  totalProfitloss: 'totalProfitloss',  // 盈亏
  area: 'area',
  agentNumber: 'number',
  admin: 'admin',     // 管理账号
  phone: 'phone',
  id: 'AgentID'       // 代理id
}

const numberKeys = {
  balance: 'BALANCE',
  equity: 'EQUITY',
  marginFree: 'MARGIN_FREE',
  agentSum: 'agentSum',
  userSum: 'userSum',
  formalUserSum: 'formalUserSum',
  totalSettling: 'totalSettling',     // 待结算金额
  totalProfitloss: 'totalProfitloss',  // 盈亏
  agentNumber: 'number',
}

export const creatDefaultUserinfo = () => {
  const data = {}
  for (let key in userInfoConfig) {
    data[key] = Object.keys(numberKeys).some(item => item === key) ? 0 : ''
  }
  return data
}

export const creatUserInfo = (originData) => {
  let data = creatDefaultUserinfo()
  if (!originData) {
    return data
  }
  for (let key in userInfoConfig) {
    data[key] = originData[userInfoConfig[key]]
  }
  return data
}

export default creatUserInfo
