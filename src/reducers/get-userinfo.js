import {
  RECEIVE_USERINFO,
  REQUEST_USERINFO
} from '../constants/action-typs'

import creatUserInfo from '../config/user-info-config'

const initState = {
  isFetching: false,
  data: {}
}
const getData = (state = initState, action) => {
  switch (action.type) {
    case REQUEST_USERINFO:
      return {
        ...state,
        isFetching: true,
        state: '',
        data: {}
      }
      case RECEIVE_USERINFO:
        return {
          ...state,
          isFetching: false,
          state: action.state,
          data: creatUserInfo(action.data)
        }
      default:
        return state
  }
}

export const userInfo = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_USERINFO:
    case RECEIVE_USERINFO:
      return getData(state, action)
    default:
      return state
  }
}