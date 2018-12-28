import React, { Component } from 'react'

import { Pagination } from 'element-react'
import ListState from '@/components/list-state/list-state'
import MonthlyQueryForm from './monthly-query-form'
import MonthlyListHeader from './monthly-list-header'
import MonthlyListCell from './monthly-list-cell'

import { getReportListData } from '@/request/report'

import './monthly.scss'

class MonthlyReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      state: 'nodata',
      records: 0,
      pageSize: 7,
      isGettingReportListData: false
    }
  }
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

  getReportListData({ url, params }) {
    this.setState = { isGettingReportListData: true }
    getReportListData({
      url,
      params
    }).then(e => {
      const isSuccStateData = e.state === 'ok' && e.records > 0
      const listInfo = {
        state: 'nodata',
        list: null,
        records: 0,
        pageSize: 0
      }

      listInfo.state = isSuccStateData ?
        'success' :
        e.state === 'error' ? 'error' : 'nodata'
      listInfo.list = isSuccStateData ? e.rows : []
      listInfo.records = isSuccStateData ? e.records : 0
      listInfo.pageSize = isSuccStateData ? e.pageSize : this.state.pageSize

      this.setState({ ...listInfo })
    }).catch(err => {
      throw err
    }).finally(_ => {
      this.setState = { isGettingReportListData: false }
    })
  }
}

export default MonthlyReport
