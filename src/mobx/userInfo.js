import { action, observable, } from 'mobx'

import { getUserInfo } from '@/request/public'
import { creatUserInfo } from '../config'

class UserInfoStore {
  @observable userInfo = creatUserInfo()
  @observable isLoadingUserInfo = false

  @action.bound
  getUserInfo() {
    if (this.isLoadingUserInfo) return
    this.isLoadingUserInfo = true
    return new Promise((resolve, reject) => {
      getUserInfo()
        .then(e => {
          this.isLoadingUserInfo = false
          if (e.state === 'ok') {
            this.userInfo = creatUserInfo(e.data)
          }
          resolve(e)
        })
        .catch(err => {
          this.isLoadingUserInfo = false
          reject(err)
        })
    })
  }
}

export default new UserInfoStore()
