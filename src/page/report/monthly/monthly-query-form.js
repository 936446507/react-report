import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ReportCheckTime from '@/components/report-check-time/report-check-time'
import TheButton from '@/components/button/the-button'

import { objectUtils, formateDate } from '@/utils'

class MonthlyQueryForm extends Component {
  static propTypes = {
    isDetail: PropTypes.bool,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    detailQuery: PropTypes.func,
    setQueryTime: PropTypes.func
  }
  static defaultProps = {
    isDetail: false
  }
  constructor(props) {
    super(props)
    this.state = {
      month: '',                  //月份
      monthlyData: {
        account: '',               // 账号
        name: '',                  // 姓名
        group: '',                 // 组别
        agentname: ''                  // 所属代理商
      },
      isInit: false
    }

    this.getReportDetailListData = this.getReportDetailListData.bind(this)
    this.changeTime = this.changeTime.bind(this)
    this.setMonthState = this.setMonthState.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.returnSummary = this.returnSummary.bind(this)
    this.init = this.init.bind(this)
    this.reset = this.reset.bind(this)
  }
  render() {
    const { isDetail } = this.props
    const { month } = this.state

    return (
      <div className="report-check">
        <div className="report-check-box">
          <div className="report-check-first-type">
            <ReportCheckTime
              title="月份"
              timeType="month"
              formate="yyyy-MM"
              changeTime={ this.changeTime }
              setMonthState={ this.setMonthState } />
            <button className="report-check-first-type-button">查询</button>
          </div>
          {
            isDetail &&
            <div className="report-check-first-type">
                <p className="report-check-first-title">月份：{ month }</p>
              <ul className="report-check-first-content">
                <li>
                  <h3>账号：</h3>
                  <input
                    type="text"
                    name="account"
                    onChange={ this.handleInput } />
                </li>
                <li>
                  <h3>姓名：</h3>
                  <input
                    type="text"
                    name="name"
                    onChange={ this.handleInput } />
                </li>
                <li>
                  <h3>组别：</h3>
                  <input
                    type="text"
                    name="group"
                    onChange={ this.handleInput } />
                </li>
                <li>
                  <h3>所属代理商：</h3>
                  <input
                    type="text"
                    name="agentname"
                    onChange={ this.handleInput } />
                </li>
              </ul>
              <div className="report-check-container">
                <TheButton
                  type="small"
                  position="right"
                  onClick={ this.reset }>重置
                </TheButton>
                <TheButton
                  type="small"
                  position="right"
                  onClick={ this.getReportDetailListData }>查询
              </TheButton>
                <TheButton
                  type="small"
                  position="right"
                  onClick={ this.returnSummary }>返回
                </TheButton>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }

  getReportDetailListData() {
    const {
      account: login,
      name: cname,
      group,
      agentname
    } = this.state.monthlyData

    this.props.detailQuery('monthlyDetail', { login, cname, group, agentname })
  }

  async changeTime(time) {
    const { setQueryTime, getReportDetailListData } = this.props

    const date = new Date(time)
    const dateYear = date.getFullYear()
    const dateMonth = date.getMonth() + 1

    const endDate = new Date(dateYear, dateMonth, 0)
    const curDate = new Date()
    const endTimeDate = endDate.getTime() > curDate.getTime() ? curDate : endDate

    const startTime = formateDate({ date: date.setDate(1), fmt: 'yyyy-MM-dd' })
    const endTime = formateDate({ date: endTimeDate, fmt: 'yyyy-MM-dd' })

    try {
      await Promise.all([
        setQueryTime('startTime', startTime),
        setQueryTime('endTime', endTime)
      ])
      if (!this.state.isInit) {
        this.setMonthState(date)
        getReportDetailListData()
      } else {
        this.setState({ isInit: false })
      }
    } catch(error) {
      throw error
    }
  }

  setMonthState(date) {
    this.setState({ month: formateDate({ date, fmt: 'yyyy年MM月' }) })
  }

  handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    const { montylyData } = this.state

    this.setState({
      monthlyData: objectUtils.modifyItem(montylyData, { [name]: value })
    })
  }

  returnSummary() {}

  init() {
    const date = new Date()
    const state = {
      month:  `${date.getUTCFullYear()}-${date.getMonth() + 1}`,
      monthlyData: {
        account: '',
        name: '',
        group: '',
        agentname: ''
      },
      isInit: true
    }

    this.setState({ ...state })
  }

  reset() {
    const monthlyData = {
      account: '',
      name: '',
      group: '',
      agentname: ''
    }

    this.setState({ monthlyData })
  }
}

export default MonthlyQueryForm