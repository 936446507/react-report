import { action, observable } from 'mobx'

import { getUserInfo } from '../request/public'
import { creatUserInfo } from '../config'

class UserInfoStore {
  @observable userInfo = creatUserInfo()
  @observable isLoadingUserInfo = false

  @action getUserInfo() {
    console.log(this)
    if (this.isLoadingUserInfo) return
    this.isLoadingUserInfo = true
    getUserInfo()
      .then(e => {
        this.isLoadingUserInfo = false
        if (e.state === 'ok') {
          this.userInfo = creatUserInfo(e.data)
        }
      })
      .catch(err => {
        this.isLoadingUserInfo = false
        throw err
      })
  }
}

export default new UserInfoStore()
