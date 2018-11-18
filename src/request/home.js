// import qs from 'qs'

import { http } from '../api/http'
import * as api from '../api/api'

/*
  * 退出登录
*/
export function logout() {
  return http.get(api.logout)
}

/*
  * 精选数据列表数据
*/
export function getHistoryData(params, cancelToken) {
  return http.get(
    api.homeInfo,
    { params, cancelToken }
  )
}
