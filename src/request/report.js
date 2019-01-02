import { http } from '../api/http'
import * as api from '../api/api'

export function getMonthlyReportListData(isDetail, params) {
  const url = isDetail ? api.monthlyDetail : api.monthlySummary

  return getReportListData(url, params)
}

export function getReportListData(url, params) {
  return http.get(
    url,
    { params }
  )
}
