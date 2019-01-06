import React, { Component } from 'react'

import { Pagination, Loading } from 'element-react'
import ListState from '@/components/list-state/list-state'
import MonthlyQueryForm from './monthly-query-form'
import MonthlyListHeader from './monthly-list-header'
import MonthlyListCell from './monthly-list-cell'

import { getMonthlyReportListData } from '@/request/report'
import { objectUtils, getUrlParams, showMessageBox } from '@/utils'

import './monthly.scss'

class MonthlyReport extends Component {
  constructor(props) {
    super(props)

    const isDetail = getUrlParams().queryType === 'detail' &&
      props.route.name === 'monthly'

    this.state = {
      info: {
        startTime: '2019-01-01',
        endTime: '2019-01-02',
        AgentID: 1
      },

      isGettingReportListData: false,
      isDetail,
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

    this.detailQuery = this.detailQuery.bind(this)
    this.getReportListData = this.getReportListData.bind(this)
    this.requestReportListData = this.requestReportListData.bind(this)
    this.changeReportListType = this.changeReportListType.bind(this)
    this.setListItemData = this.setListItemData.bind(this)
    this.getListItemData = this.getListItemData.bind(this)
    this.setQueryTime = this.setQueryTime.bind(this)
    this.handleIsDetailSetter = this.handleIsDetailSetter.bind(this)
  }
  render() {
    const { isDetail, summaryData, detailData, isGettingReportListData } = this.state
    const listData = isDetail ? detailData : summaryData

    return (
      <div className="monthly-report">
        <MonthlyQueryForm
          isDetail={ isDetail }
          detailQuery={ this.detailQuery }
          setQueryTime={ this.setQueryTime } />
        { this.props.children }
        <div className="Isolation-fence"></div>
        <Loading loading={ isGettingReportListData }>
          <div className="monthly-out">
            <div className="monthly">
              { listData.records > 0 && <MonthlyListHeader isDetail={ isDetail } /> }
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
            {
              listData.records > 0 &&
              <p className="monthly-last-show">
              当前第{ listData.page }页,共{ Math.ceil(listData.records/listData.pageSize) }页
              </p>
            }
            {
              listData.records > 0 &&
              <div className="report-pagination-content">
                <Pagination
                  layout="prev, pager, next"
                  small
                  total={ listData.records }
                  pageSize={ listData.pageSize }
                  onCurrentChange={this.getReportListData } />
              </div>
            }
          </div>
        </Loading>
        <div className="Isolation-fence"></div>
      </div>
    )
  }

  detailQuery(urlType, params = {}) {
    let info = this.state.info
    if (!(info.startTime && info.endTime)) {
      showMessageBox({ message: '请选择月份' })
      return
    }
    const isDetail = urlType === 'monthlyDetail'
    this.setState({
      isDetail
    }, async _ => {
      await Promise.all([
        this.setListItemData('page', 1),
        this.setLtisItemData('detailParams', params)
      ])

      this.getReportListData()
    })
  }

  getReportListData() {
    const { isDetail, isDirect, info, summaryData, detailData } = this.state
    const listData = isDetail ? detailData : summaryData
    let params = {
      ...info,
      page: listData.page,
      pageSize: listData.pageSize
    }

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
    this.setState({ isGettingReportListData: true })

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
      this.setState({ isGettingReportListData: false })
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
  /*
      * type: startTime, endTime
  */
  setQueryTime(type, value) {
    this.setState({
      info: objectUtils.modifyItem(this.state.info, { [type]: value })
    })
  }

  handleIsDetailSetter(newState) {
    const preState = this.state.isDetail
    // const queryType = newState ? 'detail' : 'summary'
    if (preState !== newState && !newState) {
      // this.props.history.go(-1)
    } else {
      // this.props.history.push(this.props.route.path + '?queryType=' + queryType)
    }
  }

  componentDidMount() {
    this.getReportListData()
  }

  componentWillUpdate(nextProps, nextState) {
    // this.handleIsDetailSetter(nextState.isDetail)
  }
}

export default MonthlyReport
