import React, { Component } from 'react'
import qs from 'qs'

import { http } from '../../api/http'
import * as api from '../../api/api'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      loginInfo: {
        username: 'admin',
        password: 'abc123456'
      }
    }
  }

  login = () => {
    http.post(
      api.login,
      qs.stringify(this.state.loginInfo)
    )
    .then(e => {
      console.log(e)
    })
    .catch(err => {
      throw err
    })
  }

  render() {
    return (
      <div className="login">
        <button onClick={() => {this.login()}}>login</button>
      </div>
    );
  }
}

export default Login
