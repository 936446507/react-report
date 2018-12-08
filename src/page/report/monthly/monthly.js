import React, { Component } from 'react'

import { Pagination } from 'element-react'
import ListState from '../../../components/list-state/list-state'
import MonthlyQueryForm from './monthly-query-form'
import MonthlyListHeader from './monthly-list-header'
import MonthlyListCell from './monthly-list-cell'

import './monthly.scss'

class MonthlyReport extends Component {
  render() {
    return (
      <div className="monthly-report">
        <MonthlyQueryForm></MonthlyQueryForm>
        { this.props.children }
        <div className="Isolation-fence"></div>
        <div className="monthly-out">
          <div className="monthly">
            <MonthlyListHeader></MonthlyListHeader>
            <div className="monthly-scroll">
              <div className="monthly-contain">
                <MonthlyListCell></MonthlyListCell>
              </div>
            </div>
            <ListState />
          </div>
          <p
            className="monthly-last-show">
            当前第1页,共1页
          </p>
          <div className="report-pagination-content">
            <Pagination
              layout="prev, pager, next"
              small
              total={ 50 }/>
          </div>
        </div>
        <div className="Isolation-fence"></div>
      </div>
    )
  }
}

export default MonthlyReport
