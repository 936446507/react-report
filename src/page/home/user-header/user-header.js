import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'

import { showMessageBox } from '../../../utils'
import * as request from '../../../request/home'

@inject('UserInfoStore')
@observer
class UserHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogoutting: false
    }

    this.logout = this.logout.bind(this)
  }

  render() {
    const userInfo = toJS(this.props.UserInfoStore.userInfo)
    return (
      <div className="head">
        <div className="user-info">
          <div className="user-username">{ userInfo.username }</div>
          <div className="user-login">账户:{ userInfo.agentNumber }</div>
          <div className="user-logout" onClick={ this.logout }></div>
        </div>
      </div>
    )
  }

  logout() {
    if (this.state.isLogoutting) {
      return
    }
    this.setState({
      isLogoutting: true
    })

    request.logout()
      .then(e => {
        this.setState({
          isLogoutting: false
        })
        const msg = e.state === 'ok' ? '正在跳转...' : e.msg || '退出失败，请重试'
        showMessageBox({ message: msg })
        window.location.href = window.location.origin + '/login'
      })
      .catch(err => {
        this.setState({
          isLogoutting: false
        })
        throw err
      })
  }
}

export default UserHeader