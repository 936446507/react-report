import { http } from '../api/http'
import * as api from '../api/api'
import qs from 'qs'

export function getAgentInfoData(params) {
  return http.get(
    api.getAgentInfo,
    { params }
  )
}

export function changeAgentInfoData(params) {
  return http.post(
    api.changeAgentInfo,
    qs.stringify(params)
  )
}
