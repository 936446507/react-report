import React, { Component } from 'react'

import { DatePicker, TimePicker } from 'element-react'

import { objectUtils } from '@/utils'
import {
  DEFAULT_RANGE_TYPE,
  DEFAULT_ACCOUNT_TYPE,
  DEFAULT_AGENT_TYPE,
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
        startDate: null,              // 注册开始日期
        startTime:  null, //'00:00:00',              // 注册开始时分秒
        endDate: null,                // 注册结束日期
        endTime:  null, // '00:00:00',                // 注册结束时分秒
        rangeType: DEFAULT_RANGE_TYPE,             // '0'全部，'1'直属
        accountType: DEFAULT_ACCOUNT_TYPE,           // '0'全部，'1'普通用户，'2'代理用户
        agentState: DEFAULT_AGENT_TYPE           //  -1所有 0拒绝 1正式 5欠资料 10待审核
      },
      startTimeRange: '00:00:00 - 23:59:59',
      endTimeRange: '00:00:00 - 23:59:59',
      isSearching: false
    }

    this.setType = this.setType.bind(this)
  }
  render() {
    const {
      name, account,
      startDate, startTime, endDate, endTime,
      rangeType, accountType, agentState
    } = this.state.info
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
                  Object.keys(RANGE_TYPES).map((item, index) => (
                    <button key={ index }
                    className={ rangeType === +item ? 'active-directly-bg' : 'active-directly'}
                    onClick={ _ => this.setType('rangeType', +item)}>
                    { RANGE_TYPES[item] }
                    </button>
                  ))
                }
              </div>
            </div>
          </li>
          <li className="userInfo-check-content-cell">
            <div className="userInfo-account-type">账号类型:</div>
            <div className="userInfo-account-type-button">
              <div className="include">
              {
                Object.keys(ACCOUNT_TYPES).map((item, index) => (
                  <button
                    key={ index }
                    className={ accountType === +item ? 'active-user-bg' : 'active-user' }
                    onClick={ _ => this.setType('accountType', +item)}>
                    { ACCOUNT_TYPES[item] }
                  </button>
                ))
              }
              </div>
            </div>
          </li>
          <li className="userInfo-check-content-cell">
          <div className="userInfo-agent-state">用户状态:</div>
          <div className="userInfo-agent-state-button">
            <div className="include">
            {
              Object.keys(AGENT_STATES)
              .sort((a, b) => a - b)
              .map((item, index) => (
                <button
                  key={ index }
                  className={
                    agentState === +item ?
                    'short-word active-agent-bg' :
                    'short-word active-agent'
                  }
                  onClick={ _ => this.setType('agentState', +item)}>
                  { AGENT_STATES[item] }
                </button>
              ))
            }
            </div>
          </div>
        </li>
        </ul>
        <div className="userInfo-button-line">
          <div className="userInfo-reset-button" click="reset">重置</div>
          <div
            className="userInfo-check-button">
            { isSearching ? '查询中...' : '查询'}
          </div>
        </div>
      </div>
    )
  }

  setType(type, typeValue) {
    this.setState({
      info: objectUtils.modifyItem(this.state.info, { [type]: typeValue })
    })
  }

  onChange(key, value) {
    this.setState({
      [key]: value
    })
  }
}

export default UserInfoForm
