import {
  REQUEST_USERINFO,
  RECEIVE_USERINFO
} from '../constants/action-typs'

import { getUserinfo } from '../request/public'

export const requestUserInfo = data => ({
  type: REQUEST_USERINFO,
  data
})

export const reveiveUserInfo = (res) => {
  if (res.state === 'ok') {
    return {
      type: RECEIVE_USERINFO,
      state: res.state,
      data: res.data
    }
  } else {
    return {
      type: RECEIVE_USERINFO,
      state: res.state,
      data: res.data
    }
  }
}

export const fetchUserInfo = data => dispatch => {
  dispatch(requestUserInfo(data))
  return getUserinfo()
            .then(res => res)
            .then(res => dispatch(reveiveUserInfo(res)))
}
