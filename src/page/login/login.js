import React, { Component } from 'react'
import { MessageBox  } from 'element-react'

import * as request from '../../request/login'
import { routePush } from '../../utils/routes'
import './login.scss'

class Login extends Component {
  render() {
    return (
      <div className="login-page-container">
        <div className="view login-page">
          <div className="login-page-top">
            <div className="login-page-top-upper">
              <span className="login-page-logo">
                <img src="../../assets/images/login/logo.png" alt="" />
              </span>
              <span className="login-page-company">
                <img src="../../assets/images/login/logo-word.png" alt="" />
              </span>
            </div>
          </div>
          <div className="login-form-out">
            <div className="login-form">
              <div className="login-form-account">
                <div className="login-form-list">
                  <div className="login-form-list--label">
                    <i className="icon-username"></i>
                    <span>
                      <input
                        className="login-form-list--input"
                        type="text"
                        placeholder="请输入您的用户名"
                        name="username"
                        value={ this.state.username }
                        onChange={ this.handleInput }
                        onKeyUp={ this.keyUpHandle } />
                    </span>
                  </div>
                  <div className="login-form-list--label mb0">
                    <i className="icon-password"></i>
                    <span>
                      <input
                        className="login-form-list--input"
                        type="password"
                        placeholder="请输入您的密码"
                        name="password"
                        value={ this.state.password }
                        onChange={ this.handleInput }
                        onKeyUp={ this.keyUpHandle } />
                    </span>
                  </div>
                </div>
              </div>
              <div className="login-btn-wrap">
                <div
                  className="login-btn-out"
                  onClick={ this.submit }>
                  { this.state.isSubmit ? '登录中...' : '登 录' }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      isSubmit: false
    }

    this.handleInput = this.handleInput.bind(this)
    this.checkLoginInfo = this.checkLoginInfo.bind(this)
    this.keyUpHandle = this.keyUpHandle.bind(this)
    this.submit = this.submit.bind(this)
  }

  handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  checkLoginInfo() {
    let usernmae = this.state.username
    let password = this.state.password

    if (!usernmae) {
      MessageBox.alert('用户名不能为空', '提示')
      return false
    }
    if (!password) {
      MessageBox.alert('密码不能为空', '提示')
      return false
    }
    return true
  }

  keyUpHandle(event) {
    event = event || window.event
    if (event.keyCode === 13) {
      this.submit()
    }
  }

  submit() {
    if (this.state.isSubmit) return
    if (this.checkLoginInfo()) {
      this.setState({
        isSubmit: true
      })
      let { username, password } = this.state

      request.login({ username, password })
      .then(e => {
        this.setState({
          isSubmit: false
        })
        if (e.state === 'ok') {
          routePush({ name: 'home' })
        } else {
          MessageBox.alert(e.msg, '提示')
        }
      })
      .catch(err => {
        this.setState({
          isSubmit: false
        })
        throw err
      })
    }
  }
}

export default Login
