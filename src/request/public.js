import { http } from '../api/http'
import * as api from '../api/api'

export const getUserInfo = () => {
  return http.get(api.getUserInfo)
}

export const getPermission = () => {
  return http.get(api.getPermission)
}