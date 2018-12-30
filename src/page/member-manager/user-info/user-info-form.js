import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { DatePicker, TimePicker } from 'element-react'

import { objectUtils, formateDate } from '@/utils'
import {
  DEFAULT_RANGE_TYPE,
  DEFAULT_ACCOUNT_TYPE,
  DEFAULT_AGENT_TYPE,
  RANGE_TYPES,
  ACCOUNT_TYPES,
  AGENT_STATES
} from '@/config'

export class UserInfoForm extends Component {
  static propTypes = {
    isSearching: PropTypes.bool,
    getAgentInvestorListData: PropTypes.func
  }
  static defaultProps = {
    isSearching: false
  }
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
      startDisabledDate: (time) => {
        const isFutureTime = time.getTime() > new Date().getTime()
        const endDate = this.state.info.endDate

        return endDate instanceof Date ?
          time.getTime() > endDate.getTime() || isFutureTime :
          isFutureTime
      },
      endDisabledDate: (time) => {
        const isFutureTime = time.getTime() > new Date().getTime()
        const startDate = this.state.info.startDate

        return startDate instanceof Date ?
          time.getTime() < startDate.getTime() || isFutureTime :
          isFutureTime
      }
    }
    this.getAgentInvestorListData = this.getAgentInvestorListData.bind(this)
    this.reset = this.reset.bind(this)
    this.changeInfo = this.changeInfo.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }
  render() {
    const {
      name, account,
      startDate, startTime, endDate, endTime,
      rangeType, accountType, agentState
    } = this.state.info
    const {
      startTimeRange, endTimeRange,
      startDisabledDate, endDisabledDate
    } = this.state

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
                  onChange={ this.handleInput } />
              </div>
            </div>
            <div className="userInfo-account">
              <div className="userInfo-account-table">
                <span>MT4账号:</span>
                <input
                  type="text"
                  name="account"
                  value={ account }
                  onChange={ this.handleInput } />
              </div>
            </div>
          </li>
          <li className="userInfo-check-content-cell">
            <div className="userInfo-check-content-buttom-border">
              <div className="userInfo-check-content-from">
                <span className="userInfo-register-time">注册时间:</span>
                <div className="userInfo-start-time">
                  <DatePicker
                    value={ startDate }
                    placeholder="开始日期"
                    disabledDate={ startDisabledDate }
                    onChange={date => this.changeInfo('startDate',  date)} />
                </div>
                <div className="userInfo-start-time">
                  <TimePicker
                    selectableRange={ startTimeRange }
                    placeholder="选择时间"
                    value={ startTime }
                    onChange={time => this.changeInfo('startTime', time)} />
                </div>
              </div>
              <div className="userInfo-check-content-to">
                <span className="userInfo-up">到</span>
                <div className="userInfo-start-time">
                  <DatePicker
                    value={ endDate }
                    placeholder="结束日期"
                    disabledDate={ endDisabledDate }
                    onChange={date => this.changeInfo('endDate', date)} />
                </div>
                <div className="userInfo-start-time">
                  <TimePicker
                    selectableRange={ endTimeRange }
                    placeholder="选择时间"
                    value={ endTime }
                    onChange={time => this.changeInfo('endTime', time)} />
                </div>
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
                    onClick={ _ => this.changeInfo('rangeType', +item)}>
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
                    onClick={ _ => this.changeInfo('accountType', +item)}>
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
                    onClick={ _ => this.changeInfo('agentState', +item)}>
                    { AGENT_STATES[item] }
                  </button>
                ))
              }
              </div>
            </div>
          </li>
        </ul>
        <div className="userInfo-button-line">
          <div className="userInfo-reset-button" onClick={ this.reset }>重置</div>
          <div
            className="userInfo-check-button"
            onClick= { this.getAgentInvestorListData }>
            { this.props.isSearching ? '查询中...' : '查询'}
          </div>
        </div>
      </div>
    )
  }

  getAgentInvestorListData() {
    if (this.props.isSearching) return
    const {
      name,
      account: mt4code,
      rangeType: range,
      accountType: userType,
      agentState: userState,
      startDate, endDate,
      startTime, endTime
    } = this.state.info

    const formatedStartTime = startTime ?
      formateDate({date: startTime, fmt: 'HH:mm:dd'}) :
      '00:00:00'
    const formatedEndTime = endTime ?
      formateDate({date: endTime, fmt: 'HH:mm:dd'}) :
      '00:00:00'

    const startDateCopy = formateDate({date: startDate, fmt: 'yyyy-MM-dd'}) + ' ' + formatedStartTime
    const endDateCopy = formateDate({date: endDate, fmt: 'yyyy-MM-dd'}) + ' ' + formatedEndTime

    const info = {
      name,
      mt4code,
      startDate: startDateCopy,
      endDate: endDateCopy,
      range,
      userType,
      userState
    }

    this.props.getAgentInvestorListData(info)
  }

  reset() {
    const info = {
      name: '',                   // 姓名
      account: '',                // MT4账号
      startDate: null,              // 注册开始日期
      startTime:  null, //'00:00:00',              // 注册开始时分秒
      endDate: null,                // 注册结束日期
      endTime:  null, // '00:00:00',                // 注册结束时分秒
      rangeType: DEFAULT_RANGE_TYPE,             // '0'全部，'1'直属
      accountType: DEFAULT_ACCOUNT_TYPE,           // '0'全部，'1'普通用户，'2'代理用户
      agentState: DEFAULT_AGENT_TYPE           //  -1所有 0拒绝 1正式 5欠资料 10待审核
    }

    this.setState({ info })
  }

  changeInfo(key, value) {
    this.setState({
      info: objectUtils.modifyItem(this.state.info, { [key]: value })
    })
  }

  handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.changeInfo(name, value)
  }

  componentDidMount() {
    this.props.onRef(this)
  }
}

export default UserInfoForm
