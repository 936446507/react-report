import { http } from '../api/http'

export function getReportListData({ url, params }) {
  return http.get(
    url,
    { params }
  )
}
