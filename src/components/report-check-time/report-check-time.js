import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { DatePicker } from 'element-react'

import './report-check-time.scss'

class ReportCheckTime extends Component {
  static propTypes = {
    title: PropTypes.string
  }
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    const { modelDataNew } = this.state
    const { title } = this.props

    return (
      <div className="bord report-check-fill-time">
        <h3 className="date-check">{ title }</h3>
        <div className="block">
          <DatePicker
            value={ modelDataNew }
            onChange={date => {
              this.setState({ modelDataNew: date })
            }}
            selectionMode="month" />
        </div>
      </div>
    )
  }
}

export default ReportCheckTime
