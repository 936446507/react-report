import React, { Component } from 'react'

import { DatePicker, TimePicker } from 'element-react'
import {
  RANGE_TYPES,
  ACCOUNT_TYPES,
  AGENT_STATES
} from '@/config'

export class UserInfoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: {
        name: '',                   // 姓名
        account: '',                // MT4账号
        startDate: '',              // 注册开始日期
        startTime: '00:00:00',              // 注册开始时分秒
        endDate: '',                // 注册结束日期
        endTime: '00:00:00',                // 注册结束时分秒
        rangeType: '0',             // '0'全部，'1'直属
        accountType: '0',           // '0'全部，'1'普通用户，'2'代理用户
        agentState: '-1'           //  -1所有 0拒绝 1正式 5欠资料 10待审核
      },
      startTimeRange: '00:00:00 - 23:59:59',
      endTimeRange: '00:00:00 - 23:59:59',
      isSearching: false
    }
  }
  render() {
    const { name, account, startDate, startTime, endDate, endTime } = this.state.info
    const { startTimeRange, endTimeRange, isSearching } = this.state

    return (
      <div className="userInfo-check">
        <ul className="userInfo-check-content">
          <li className="userInfo-check-content-cell">
            <div className="userInfo-name">
              <div className="userInfo-name-table">
                <span>姓名:</span>
                <input
                  type="text"
                  name="name"
                  value={ name }
                  onChange={ this.onChange.bind(this, 'name') } />
              </div>
            </div>
            <div className="userInfo-account">
              <div className="userInfo-account-table">
                <span>MT4账号:</span>
                <input
                  type="text"
                  name="account"
                  value={ account }
                  onChange={ this.onChange.bind(this, 'account')} />
              </div>
            </div>
          </li>
          <li className="userInfo-check-content-cell">
            <div className="userInfo-check-content-buttom-border">
              <div className="userInfo-check-content-from">
                <span className="userInfo-register-time">注册时间:</span>
                <DatePicker
                  className="userInfo-start-time"
                  value={ startDate }
                  placeholder="开始日期"
                  onChange={date => this.setState({startDate: date})} />
                <TimePicker
                  className="userInfo-start-time"
                  selectableRange={ startTimeRange }
                  placeholder="选择时间"
                  value={ startTime }
                  onChange={time => this.setState({startTime: time})} />
              </div>
              <div className="userInfo-check-content-to">
                <span className="userInfo-up">到</span>
                <DatePicker
                  className="userInfo-start-time"
                  value={ endDate }
                  placeholder="结束日期"
                  onChange={date => this.setState({endDate: date})} />
                <TimePicker
                  className="userInfo-start-time"
                  selectableRange={ endTimeRange }
                  placeholder="选择时间"
                  value={ endTime }
                  onChange={time => this.setState({endTime: time})} />
              </div>
            </div>
          </li>
          <li className="userInfo-check-content-cell">
            <div className="userInfo-check-range">查询范围:</div>
            <div className="userInfo-check-range-button">
              <div className="include">
                {
                  Object.keys[RANGE_TYPES].map((item, index) => (
                    <button key={ index }>{RANGE_TYPES[item]}</button>
                  ))
                }
              </div>
            </div>
          </li>
          <li class="userInfo-check-content-cell">
            <div class="userInfo-account-type">账号类型:</div>
            <div class="userInfo-account-type-button">
              <div class="include">
              {
                Object.keys[ACCOUNT_TYPES].map((item, index) => (
                  <button key={ index }>{ACCOUNT_TYPES[item]}</button>
                ))
              }
              </div>
            </div>
          </li>
          <li class="userInfo-check-content-cell">
          <div class="userInfo-agent-state">用户状态:</div>
          <div class="userInfo-agent-state-button">
            <div class="include">
            {
              Object.keys[AGENT_STATES].map((item, index) => (
                <button key={ index }>{AGENT_STATES[item]}</button>
              ))
            }
            </div>
          </div>
        </li>
        </ul>
        <div class="userInfo-button-line">
          <div class="userInfo-reset-button" click="reset">重置</div>
          <div
            class="userInfo-check-button">
            { isSearching ? '查询中...' : '查询'}
          </div>
        </div>
      </div>
    )
  }

  onChange(key, value) {
    this.setState({
      [key]: value
    })
  }
}

export default UserInfoForm
