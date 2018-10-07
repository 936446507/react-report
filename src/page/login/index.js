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
                      placeholder="请输入您的用户名" />
                    </span>
                  </div>
                  <div className="login-form-list--label mb0">
                    <i className="icon-password"></i>
                    <span>
                      <input
                      className="login-form-list--input"
                      type="password"
                      placeholder="请输入您的密码" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="login-btn-wrap">
                <div className="login-btn-out">
                { this.state.isSubmit ? '登录中...' : '登 录' }
                </div>
                <div
                  className="login-to-computer">
                  <div className="take-computer">
                    前往电脑版
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
