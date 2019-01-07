import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { DatePicker } from 'element-react'

import './report-check-time.scss'

class ReportCheckTime extends Component {
  static propTypes = {
    title: PropTypes.string,
    timeType: PropTypes.string,
    formate: PropTypes.string
  }
  static defaultProps = {
    timeType: 'day',
    formate: 'yyyy-MM-dd'
  }
  constructor(props) {
    super(props)
    this.state = {
      date: new Date()
    }

    this.changeTime = this.changeTime.bind(this)
  }
  render() {
    const { date } = this.state
    const { title, timeType, formate } = this.props

    return (
      <div className="bord report-check-fill-time">
        <h3 className="date-check">{ title }</h3>
        <div className="block">
          <DatePicker
            value={ date }
            isShowTrigger={ false }
            selectionMode={ timeType }
            formate={ formate }
            disabledDate={ time => time.getTime() > Date.now() }
            onChange={ date => this.setState({ date }) } />
        </div>
      </div>
    )
  }

  changeTime(date) {
    this.setState(
      { date: date },
      _ => { this.props.setMonthState(this.state.date) }
    )
  }

  componentDidMount() {
    console.log(this.state.date)
    this.props.changeQueryTime(this.state.date)
  }
}

export default ReportCheckTime
