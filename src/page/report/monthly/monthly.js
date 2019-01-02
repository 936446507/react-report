import React, { Component } from 'react'

import { Pagination } from 'element-react'
import ListState from '@/components/list-state/list-state'
import MonthlyQueryForm from './monthly-query-form'
import MonthlyListHeader from './monthly-list-header'
import MonthlyListCell from './monthly-list-cell'

import { getMonthlyReportListData } from '@/request/report'
import { objectUtils } from '@/utils'

import './monthly.scss'

class MonthlyReport extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: {
        startTime: '',
        endTime: '',
        AgentID: ''
      },

      isGettingReportListData: false,
      isDetail: false,
      isDirect: false, // 是否直属

      // 汇总页数据
      summaryData: {
        state: 'nodata',
        list: [],
        page: 1,
        pageSize: 7,
        records: 0
      },
      // 详情页数据
      detailData: {
        state: 'nodata',
        list: [],
        page: 1,
        pageSize: 7,
        records: 0,
        detailParams: {}
      }
    }

    this.getReportListData = this.getReportListData.bind(this)
    this.requestReportListData = this.requestReportListData.bind(this)
    this.setListItemData = this.setListItemData.bind(this)
    this.getListItemData = this.getListItemData.bind(this)
  }
  render() {
    const { isDetail, summaryData, detailData } = this.state
    const listData = isDetail ? detailData : summaryData

    return (
      <div className="monthly-report">
        <MonthlyQueryForm></MonthlyQueryForm>
        { this.props.children }
        <div className="Isolation-fence"></div>
        <div className="monthly-out">
          <div className="monthly">
            <MonthlyListHeader isDetail={ isDetail }></MonthlyListHeader>
            <div className="monthly-scroll">
              <div className="monthly-contain">
                {
                  listData.list.map((item, index) => (
                    <MonthlyListCell
                      key={ index }
                      isDetail={ isDetail }
                      data={ item }
                      changeReportListType={ this.changeReportListType } />
                  ))
                }
              </div>
            </div>
            <ListState state={ listData.state } reload={ this.getReportListData }/>
          </div>
          <p
            className="monthly-last-show">
            当前第{ listData.page }页,共{ Math.ceil(listData.records/listData.pageSize) }页
          </p>
          <div className="report-pagination-content">
            <Pagination
              layout="prev, pager, next"
              small
              total={ listData.records }
              pageSize={ listData.pageSize }
              onCurrentChange={this.getReportListData } />
          </div>
        </div>
        <div className="Isolation-fence"></div>
      </div>
    )
  }

  getReportListData() {
    const { isDetail, isDirect } = this.state
    let params = this.state.info

    if (isDetail) {
      params = {
        ...params,
        ...{
          type: isDirect ? 'direct': 'all',
          AgentID: ''
        },
        ...this.state.detailData.detailParams
      }
    }

    this.requestReportListData(isDetail, params)
  }

  requestReportListData(isDetail, params) {
    this.setState = { isGettingReportListData: true }

    getMonthlyReportListData(
      isDetail,
      params
    ).then(e => {
      const isSuccStateData = e.state === 'ok' && e.records > 0
      const { isDetail, summaryData, detailData } = this.state
      const listData = isDetail ? detailData : summaryData
      const listDataKey = isDetail ? 'detailData' : 'summaryData'
      const listInfo = {
        state: 'nodata',
        list: null,
        records: 0,
        pageSize: isDetail ? detailData.pageSize : summaryData.pageSize
      }

      listInfo.state = isSuccStateData ?
        'success' :
        e.state === 'error' ? 'error' : 'nodata'
      listInfo.list = isSuccStateData ? e.rows : []
      listInfo.records = isSuccStateData ? e.records : 0
      listInfo.pageSize = isSuccStateData ? e.pageSize : listInfo.pageSize

      this.setState({
        [listDataKey]: objectUtils.modifyItem(listData, listInfo)
      })
    }).catch(err => {
      throw err
    }).finally(_ => {
      this.setState = { isGettingReportListData: false }
    })
  }

  // 点击 [直属 | 全部] 时事件
  changeReportListType(agentId, isDirect) {
    this.setState({
      isDetail: true,
      isDirect,
      agentId
    })
  }

  /*
    * 通过isDetail设置 state summaryData 或者 detailData中key的值
    * key: state, list, page, records, detailParams(isDetail: true)
  */
  setListItemData(key, value) {
    const { isDetail, summaryData, detailData } = this.state
    const listData = isDetail ? detailData : summaryData
    const listDataKey = isDetail ? 'detailData' : 'summaryData'

    const newListData = Object.keys(listData).includes(key) ?
      objectUtils.modifyItem(listData, { key: value }) :
      listDataKey

    this.setState({ [listDataKey]: newListData })
  }

  getListItemData(key) {
    const { isDetail, summaryData, detailData } = this.state
    const listData = isDetail ? detailData : summaryData

    return Object.keys(listData).includes(key) ? listData[key] : ''
  }

  componentDidMount() {
    // this.getReportListData()
  }

  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps, nextState)
  }
}

export default MonthlyReport
