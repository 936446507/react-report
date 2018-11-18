import React, { Component } from 'react'
import { Switch } from 'element-react'

import HistoryListItem from './history-list-item'

import { getHistoryData } from '../../../request/home'
import { getCancelSource } from '../../../api/http'
import { dateConfig, define } from '../../../config'

class HistroyList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDetails: false,
      listMapNow: (() => {
        const listMap = {}
        ;['today', 'week', 'month'].forEach(key => {
          listMap[key] = {
            // #init, #loading, #timeout, #nodata, #finished
            isLoading: 'init',
            cancelSource: null,
            data: (_ => ({
              deposit: 0,
              gold: 0,
              netDeposit: 0,
              profitloss: 0,
              siviler: 0,
              turnover: 0,
              withdr: 0
            }))()
          }
        })
        return listMap
      })(),
      listMapLast: (() => {
        const listMap = {}
        ;['yesterday', 'lastweek', 'lastmonth'].forEach(key => {
          listMap[key] = {
            // #init, #loading, #timeout, #nodata, #finished
            isLoading: 'init',
            cancelSource: null,
            data: (_ => ({
              deposit: 0,
              gold: 0,
              netDeposit: 0,
              profitloss: 0,
              siviler: 0,
              turnover: 0,
              withdr: 0
            }))()
          }
        })
        return listMap
      })()
    }

    this.getHistoryData = this.getHistoryData.bind(this)
  }
  render() {
    const { listMapNow, isDetails, listMapLast } = this.state
    return (
      <div className="history">
        <div className="historyLists">
          <div className="historyLists-head">
            <h3 className="historyLists-title">精选数据</h3>
            <div className="details-button">
              <span>详情</span>
              <Switch
                value={ isDetails }
                onText=""
                offText=""
                onColor="#f2c127"
                offColor="#ccc"
                onValue={ true }
                offValue={ false }
                onChange={ value => {this.setState({isDetails: value})} } />
            </div>
          </div>
          <HistoryListItem
            day="today"
            isDetails={ isDetails }
            listMap={ listMapNow }/>
          <HistoryListItem
            day="yesterday"
            isDetails={ isDetails }
            listMap={ listMapLast } />
        </div>
      </div>
    )
  }

  getHistoryData(type, refresh) {
    if (!type) return
    const { listMapNow, listMapLast } = this.state
    const isNow = dateConfig[type].isNow || false
    let listMap = isNow ? listMapNow : listMapLast
    let item

    Object.keys(listMap).forEach(key => {
      // 取消此次请求的以外请求
      if (key !== type && listMap[key].cancelSource) {

      }
    })

    const params = { dataType: type }
    const source = getCancelSource()
    getHistoryData(params, source.cancelToken)
  }
  componentDidMount() {
  }
}

export default HistroyList
