import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { formateDate, toSuperNumber } from '@/utils'

export class UserInfoListCell extends Component {
  static propTypes = {
    data: PropTypes.object
  }
  static defaultProps = {
    data: {}
  }
  render() {
    const { data } = this.props
    data.CreateTime = formateDate({date: data.CreateTime})
    data.BALANCE = toSuperNumber(data.BALANCE)
    data.EQUITY = toSuperNumber(data.EQUITY)
    data.MARGIN_FREE = toSuperNumber(data.MARGIN_FREE)

    return (
      <div className="userInfo-list--cell">
        {/* MT4名称 */}
        <div>{ data.MT4AccountNum }</div>
        {/* 姓名 */}
        <div>{ data.AgentInvestorName }</div>
        {/* 所属代理商 */}
        <div>{ data.AgentName }</div>
        {/* 客户主任编号 */}
        <div>{ data.ib }</div>
        {/* 账号类别 */}
        <div>{ data.isAgent }</div>
        {/* 注册时间 */}
        <div className="register-time-width">{ data.CreateTime }</div>
        {/* 余额 */}
        <div>{ data.BALANCE }</div>
        {/* 净值 */}
        <div>{ data.EQUITY }</div>
        {/* 可用保证金 */}
        <div>{ data.MARGIN_FREE }</div>
      </div>
    )
  }
}

export default UserInfoListCell
