import React, { Component } from 'react'

import UserHeader from '../page/home/user-header/user-header'

import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'

@inject('UserInfoStore')
@observer
class UserHeaderContainer extends Component {
  render() {
    const userInfo = toJS(this.props.UserInfoStore.userInfo)

    return (
      <UserHeader
        userInfo={ userInfo } />
    )
  }
}

export default UserHeaderContainer
