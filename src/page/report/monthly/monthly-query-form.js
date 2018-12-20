import React, { Component } from 'react'

import ReportCheckTime from '@//components/report-check-time/report-check-time'

class MonthlyQueryForm extends Component {
  render() {
    return (
      <div className="report-check">
        <div className="report-check-box">
          <div className="report-check-first-type">
            <ReportCheckTime></ReportCheckTime>
            <button className="report-check-first-type-button">查询</button>
          </div>
          <div
            className="report-check-first-type" style={{display: 'none'}}>
            <p className="report-check-first-title">月份：</p>
            <ul className="report-check-first-content">
              <li>
                <h3>账号：</h3>
                <input type="text"  />
              </li>
              <li>
                <h3>姓名：</h3>
                <input type="text"  />
              </li>
              <li>
                <h3>组别：</h3>
                <input type="text"  />
              </li>
              <li>
                <h3>所属代理商：</h3>
                <input type="text"  />
              </li>
            </ul>
            <div className="report-check-container">
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MonthlyQueryForm