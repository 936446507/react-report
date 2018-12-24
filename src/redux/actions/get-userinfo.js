import {
  REQUEST_USERINFO,
  RECEIVE_USERINFO
} from '../constants/action-typs'

import { getUserInfo } from '@/request/public'

export const requestUserInfo = info => ({
  type: REQUEST_USERINFO,
  state: '',
  data: info
})

export const reveiveUserInfo = info => {
  return {
    type: RECEIVE_USERINFO,
    state: info.state,
    data: info.data
  }
}

export const fetchUserInfo = data => dispatch => {
  dispatch(requestUserInfo(data))
  return (
    getUserInfo()
      .then(res => dispatch(reveiveUserInfo(res)))
      .catch(err => {
        dispatch(reveiveUserInfo({ state: 'error', data: {} }))
        throw err
      })
  )
}
