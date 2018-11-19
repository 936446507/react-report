import React, { Component } from 'react'
import { Switch } from 'element-react'

import HistoryListItem from './history-list-item'

import { getHistoryData } from '../../../request/home'
import { getCancelSource } from '../../../api/http'
import { dateConfig, CANCEL_MSG } from '../../../config'
import { objectUtils } from '../../../utils'
import { Object } from 'core-js';

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
            listMap={ listMapNow }
            getHistoryData={ this.getHistoryData } />
          <HistoryListItem
            day="yesterday"
            isDetails={ isDetails }
            listMap={ listMapLast } />
        </div>
      </div>
    )
  }

  getHistoryData(type, refresh) {
    if (!dateConfig[type].chinese) return
    const { listMapNow, listMapLast } = this.state
    const isNow = dateConfig[type].isNow || false
    const listMapName = isNow ? 'listMapNow' : 'listMapLast'
    const listMap = isNow ? listMapNow : listMapLast
    let item

    Object.keys(listMap).forEach(key => {
      // 取消此次请求的以外请求
      if (key !== type && listMap[key].cancelSource) {
        this.state[listMapName].cancelSource.cancel(CANCEL_MSG)
        const newItem = objectUtils.modifyItem(
          {}, this.state[listMapName][type], {cancelSource: null}
        )
        this.setState({
          [listMapName]: objectUtils.modifyItem(this.state[listMapName], {[type]: newItem})
        })
      }
    })
    item = this.state[listMapName][type]

    // 昨日 上周 上月只请求一次数据，所以‘fineshed’状态后将不再请求
    if (
      !isNow &&
      (item.isLoading === 'loading' || item.isLoading === 'finished') && refresh !== 'refresh'
    ) {
      return
    }

    const params = { dateType: type }
    const source = getCancelSource()
    getHistoryData(
      params,
      source.cancelToken
    ).then(e => {
      if (e.state === 'ok') {
        item.data = e.data
        item.isLoading = 'finished'
      } else if (e.state === 'error') {
        item.isLoading = 'timeout'
      } else {
        item.isLoading = 'nodata'
      }
      this.setState({
        [listMapName]: objectUtils.modifyItem(
          this.state[listMapName], { [type]: item }
        )
      })
    }).catch(err => {
      throw err
    })
  }
  cancelAllRequest() {
    const listAllMap = Object.assign({}, this.state.listMapNow, this.state.listMapLast)
    Object.keys(listAllMap).forEach(key => {
      const isNow = dateConfig[key].isNow || false
      const listMapName = isNow ? 'listMapNow' : 'listMapLast'
      this.state[listMapName][key].cancelSource.cancel()
    })
  }
  componentDidMount() {
  }
}

export default HistroyList
