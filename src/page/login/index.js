import React, { Component } from 'react'
import qs from 'qs'

import { http } from '../../api/http'
import * as api from '../../api/api'
import { showMessage } from '../../utils/message/index'

import './login.scss'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      isSubmit: false
    }
  }

  handleInput = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  checkLoginInfo = () => {
    let usernmae = this.state.username
    let password = this.state.password

    if (!usernmae) {
      showMessage({
        message: '用户名不能为空',
        type: 'error'
      })
      return false
    }
    if (!password) {
      showMessage({
        message: '密码不能为空',
        type: 'error'
      })
      return false
    }
  }

  login = () => {
    this.checkLoginInfo()
    this.setState({
      isSubmit: true
    })
    http.post(
      api.login,
      qs.stringify(this.state.loginInfo)
    )
    .then(e => {
      this.setState({
        isSubmit: false
      })
      console.log(e)
    })
    .catch(err => {
      this.setState({
        isSubmit: false
      })
      throw err
    })
  }

  render() {
    return (
      <div className="login">
        <div className="view login-page">
          <div className="login-page-top">
            <div className="login-page-top-in">
              <h3 className="login-page-companyname">高晟金業集團有限公司</h3>
              <span className="login-page-welcome"></span>
            </div>
          </div>
          <div className="login-form">
            <div className="login-form-list">
              <div className="login-form-list--logo"></div>
              <div className="login-form-list--label">
                <h3 className="icon-username">用户名</h3>
                <span>
                  <input
                  className="login-form-list--input"
                  type="text"
                  placeholder="请输入您的用户名"
                  name="username"
                  value={ this.state.username }
                  onChange={ this.handleInput } />
                </span>
              </div>
              <div className="login-form-list--label mb0">
                <h3 className="icon-password">密码</h3>
                <span>
                  <input
                  className="login-form-list--input"
                  type="password"
                  name="password"
                  placeholder="请输入您的密码"
                  value={this.state.password}
                  onChange={ this.handleInput } />
                </span>
              </div>
              <div className="login-btn-wrap">
                <div
                  className="login-btn-out"
                  onClick={ _ => this.login()}>
                  { this.state.isSubmit ? '登录中' : '登录'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login
