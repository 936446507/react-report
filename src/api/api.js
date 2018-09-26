export const isDev = process.env.NODE_ENV === 'development'

let baseUrl = isDev ? '/api/' : window.baseUrl
// const baseUrl = window.baseUrl
let uploadUrl = isDev ? '/img/' : window.uploadUrl

const urlLastReg = /\/$/g
if (!urlLastReg.test(baseUrl)) {
  baseUrl += '/'
}
if (!urlLastReg.test(uploadUrl)) {
  uploadUrl += '/'
}
export {
  baseUrl,
  uploadUrl
}
// =================================== api ==================================
// =================================== home
// 首页信息
export const homeInfo = `${baseUrl}home/index?fromSystem=1`
// 登录
export const login = `${baseUrl}home/login?fromSystem=1`
// 退出登录
export const logout = `${baseUrl}home/LoginOut?fromSystem=1`
// 获取用户信息
export const getUserInfo = `${baseUrl}home/UserInfo?fromSystem=1`

// 登录到报表系统
export const loginToReport = baseUrl + 'user/OneClickLogin?fromSystem=1'

// 手机验证码
export const getPhoneCode = baseUrl + 'login/GetRegisterPhoneCode?fromSystem=1'
// 注册
export const register = baseUrl + 'login/Register_user?fromSystem=1'

// 获取汇率
export const getRate = baseUrl + 'user/GetRate?fromSystem=1'
// 入金申请
export const deposit = baseUrl + 'user/DoDeposit?fromSystem=1'
// 出金申请
export const withdraw = baseUrl + 'user/DoWithdraw?fromSystem=1'
// 转账给自己
export const transferself = baseUrl + 'user/TransferAccountsSelf?fromSystem=1'
// 转账给下级
export const transfer = baseUrl + 'user/TransferAccounts?fromSystem=1'
// 历史纪录
export const history = baseUrl + 'user/Gethistory?fromSystem=1'
export const testApi = baseUrl + '?fromSystem=1'
// 修改密码
export const changePassword = baseUrl + 'user/ModifyPassWord?fromSystem=1'
// 找回密码
export const forgetPassword = baseUrl + 'Login/ForgetPasswordMail?fromSystem=1'
// 检查ib
export const checkIb = baseUrl + 'login/CheckIB?fromSystem=1'
// 获取身份证微信上传二维码
export const UploadIDQRCode = baseUrl + 'login/UploadIDQRCode?fromSystem=1'
// 获取银行卡微信上传二维码
export const uploadBankQRCode = baseUrl + 'login/UploadBankQRCode?fromSystem=1'
// 获取手持证件照、合约签署照上传二维码
export const uploadImgQRCode = baseUrl + 'login/UploadImgQRCode?fromSystem=1'
// 微信上传后 获取信息是否成功 检查微信上传二维码
export const checkCard = baseUrl + 'login/CheckCard?fromSystem=1'
// 补全银行卡资料
export const perfectBank = baseUrl + 'user/PerfectBank?fromSystem=1'
// 获取登录/绑定二维码
export const getQR = baseUrl + 'login/GetQR?fromSystem=1'
// 检查登录二维码
export const checkQRLogin = baseUrl + 'login/QRLogin?fromSystem=1'
// 绑定微信
export const bindWX = baseUrl + 'user/BindWX?fromSystem=1'
// 取消绑定微信 warning
export const releaseBindingWX = baseUrl + 'user/ReleaseBindingWX?fromSystem=1'
// 获取修改资料 修改密码 记录
export const getModifyHistory = baseUrl + 'user/GetModifyHistory?fromSystem=1'
// 修改资料 warning
export const changeData = baseUrl + 'user/ModifyMember?fromSystem=1'
// 获取登录日志
export const getLoginlog = baseUrl + 'login/GetLoginlog?fromSystem=1'
// 获取验证码
export const verifyCode = baseUrl + 'login/verifyCode?fromSystem=1'
// 获取图片上传配置
export const getPageConfig = baseUrl + 'login/GetPageConfig?fromSystem=1'
// 图形验证码
export const getImgCode = function() {
  return baseUrl + 'tools/verify_code.ashx?t=' + new Date().getTime() + '&fromSystem=1'
}
// 报表

// 月结报表
export const monthlySummary = baseUrl + 'report/GetMonthlySummary?fromSystem=1'
// 月结报表详情
export const monthlyDetail = baseUrl + 'report/GetMonthlyDetail?fromSystem=1'

// 盈亏报表
export const plSummary = baseUrl + 'report/GetPLSummary?fromSystem=1'
// 盈亏报表详情
export const plDetails = baseUrl + 'report/GetPLDetail?fromSystem=1'

// 净值报表
export const equitySummary = baseUrl + 'report/GetEquitySummary?fromSystem=1'
// 净值报表详情
export const equityDetail = baseUrl + 'report/GetEquityDetail?fromSystem=1'

// 交易清单
export const confirmationQuery = baseUrl + 'report/GetConfirmationQuery?fromSystem=1'

// 未平仓报表
export const openPositionSummary = baseUrl + 'report/GetOpenPositionSummary?fromSystem=1'
// 未平仓报表详情
export const openPositionDetail = baseUrl + 'report/GetOpenPositionDetail?fromSystem=1'

// 已平仓报表
export const closeTradesSummary = baseUrl + 'report/GetCloseTradesSummary?fromSystem=1'
// 已平仓报表详情
export const closeTradesDetail = baseUrl + 'report/GetCloseTradesDetail?fromSystem=1'

// 交易量报表
export const turnOverSummary = baseUrl + 'report/GetTurnOverSummary?fromSystem=1'
// 交易量报表详情
export const turnOverDetail = baseUrl + 'report/GetTurnOverDetail?fromSystem=1'

// 结算报表
export const settleReportSummary = baseUrl + 'report/GetSettleReportSummary?fromSystem=1'

// 存取款报表
export const depositWithdrawSummary = baseUrl + 'report/GetDepositWithdrawSummary?fromSystem=1'
export const depositWithdrawDetail = baseUrl + 'report/GetDepositWithdrawDetail?fromSystem=1'

// 会员管理
// 获取代理商信息
export const getAgentInfo = baseUrl + 'agent/GetAgentInfo'

// 修改代理商信息
export const changeAgentInfo = baseUrl + 'agent/GetAgentEdit'

// 查询投资者列表
export const getAgentInvestorList = baseUrl + 'agent/GetAgentInvestorList'

// 中介商报表
export const intermedieReportSummary = baseUrl + 'report/GetIntermedieReportSummary?fromSystem=1'
// 获取直属所有AgentNumber

export const directAgentNumber = baseUrl + 'report/GetDirectAgentNumber?fromSystem=1'
// 代理树数据
export const agentTree = baseUrl + 'agent/GetAgentTree?fromSystem=1'

// 权限集合
export const getPermission = baseUrl + 'home/GetPermission?fromSystem=1'
