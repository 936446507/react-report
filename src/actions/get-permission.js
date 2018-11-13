import {
  REQUEST_PERMISSION,
  RECEIVE_PERMISSION
} from '../constants/action-typs'

import { getPermission } from '../request/public'

export const requestPermission = data => ({
  type: REQUEST_PERMISSION,
  state: '',
  data
})

export const reveivePermission = (res) => {
  if (res.state === 'ok') {
    return {
      type: RECEIVE_PERMISSION,
      state: res.state,
      data: res.data
    }
  } else {
    return {
      type: RECEIVE_PERMISSION,
      state: res.state,
      data: res.data
    }
  }
}

export const fetchPermission = data => dispatch => {
  dispatch(requestUserInfo(data))
  return getPermission()
            .then(res => res)
            .then(res => dispatch(reveivePermission(res)))
            .catch(err => { throw err })
}
