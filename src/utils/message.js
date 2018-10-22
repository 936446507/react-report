import { Message } from 'element-react'
import { checkDataType } from '../check-data-type/index'

export function showMessage({
  message = '',
  type = 'info',
  duration = 3000,
  isShowClose = false,
  closeCB
  }) {
    let params = {
      message,
      type,
      duration,
      showClose: isShowClose
    }
    if (
      isShowClose &&
      closeCB &&
      checkDataType(closeCB) === 'Function'
    ) {
      params.onClose = closeCB
    }
    Message(params)
}
