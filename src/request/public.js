import { http } from '../api/http'
import * as api from '../api/api'

export const getUserinfo = () => {
  return http.get(api.getUserInfo)
}
