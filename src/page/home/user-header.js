import React, { Component } from 'react'

import './user-header.scss'
import * as api from '../../api/api'
import http from '../../api/http'

class UserHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogoutting: false,
      userInfo: {
        username: '123',
        agentNumber: 123
      }
    }

    this.logout = this.logout.bind(this)
  }

  render() {
    const { userInfo } = this.state
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
    http
      .get(api.logout)
      .then(e => {
        this.setState({
          isLogoutting: false
        })
        if (e.state === 'ok') {
          // todo deal success
          // this.$mbDialogs.show({
          //   content: '正在跳转...'
          // })
        } else {
          // this.$mbDialogs.show({
          //   content: e.msg || '退出失败，请重试'
          // })
        }
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