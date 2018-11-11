import qs from 'qs'

import { http } from '../api/http'
import * as api from '../api/api'

export function login(params) {
  return http.post(
    api.login,
    qs.stringify(params)
  )
}
