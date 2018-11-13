import { http } from '../api/http'
import * as api from '../api/api'

export const getUserinfo = () => {
  return http.get(api.getUserInfo)
}

export const getPermission = () => {
  return http.get(api.getPermission)
}