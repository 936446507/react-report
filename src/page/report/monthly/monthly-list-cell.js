import React, { Component } from 'react'

class MonthlyListCell extends Component {
  render() {
    return (
      <div className="monthly-list--cell">
        <div>
          总公司
        </div>
        <div>
          271,693,924.80
        </div>
        <div>
          271,453,969.77
        </div>
        <div>
          247.00
        </div>
        <div>
          0.00
        </div>
        <div>
          0.00
        </div>
        <div>
          0.00
        </div>
        <div>
          -240,202.03
        </div>
        <div>
          0.00
        </div>
        <div>
          0.00
        </div>
        <div>
          0.00
        </div>
        <div>
          0.00
        </div>
        <div>
          0.00
        </div>
        <div className="report-directly-all">
          <button className="directly">直属</button>
          <span className="interval">|</span>
          <button className="all">全部</button>
        </div>
      </div>
    )
  }
}

export default MonthlyListCell