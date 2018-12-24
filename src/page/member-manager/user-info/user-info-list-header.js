import React, { Component } from 'react'

export class UserInfoListHeader extends Component {
  render() {
    return (
      <div className="userInfo-list--header">
        <div>姓名</div>
        <div>所属代理商</div>
        <div>客户主任编号</div>
        <div>账号类别</div>
        <div className="register-time-width">注册时间</div>
        <div>余额</div>
        <div>净值</div>
        <div>可用保证金</div>
      </div>
    )
  }
}

export default UserInfoListHeader
