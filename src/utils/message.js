import { Message } from 'element-react'
import { MessageBox } from 'element-react'
import { checkDataType } from './check-data-type'

const showMessage = ({
  message = '',
  type = 'info',
  duration = 3000,
  isShowClose = false,
  closeCB
}) => {
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

const showMessageBox = ({
  title = '提示',
  message,
  confirmCb,
  cancelCb
}) => {
  MessageBox.msgbox({
    title,
    message,
    showCancelButton: !!cancelCb
  }).then(() => {
    confirmCb && confirmCb()
  }).catch(() => {
    cancelCb && cancelCb()
  })
}

export {
  showMessage,
  showMessageBox
}
