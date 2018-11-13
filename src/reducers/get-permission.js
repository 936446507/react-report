import {
  REQUEST_PERMISSION,
  RECEIVE_PERMISSION
} from '../constants/action-typs'

const initState = {
  isFetching: false,
  state: '',
  data: {}
}

const getPermission = (state = initState, action) => {
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
        data: action.data
      }
    default:
      return state
  }
}

export const permission = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_PERMISSION:
    case RECEIVE_PERMISSION:
      return getPermission(state, action)
    default:
      return state
  }
}
