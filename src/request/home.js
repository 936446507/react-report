// import qs from 'qs'

import { http } from '../api/http'
import * as api from '../api/api'

/*
  * 退出登录
*/
export function logout() {
  return http.get(api.logout)
}
