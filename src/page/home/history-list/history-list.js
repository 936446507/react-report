import React, { Component } from 'react'
import { Switch } from 'element-react'

import HistoryListItem from './history-list-item'

import { historyListState } from '../entity'
import { getHistoryData } from '../../../request/home'
import { getCancelSource } from '../../../api/http'
import { dateConfig, CANCEL_MSG } from '../../../config'
import { objectUtils } from '../../../utils'

class HistroyList extends Component {
  constructor(props) {
    super(props)
    this.state = { ...historyListState }

    this.getHistoryData = this.getHistoryData.bind(this)
    this.cancelRequest = this.cancelRequest.bind(this)
    this.cancelAllRequest = this.cancelAllRequest.bind(this)
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
            listMap={ listMapLast }
            getHistoryData={ this.getHistoryData } />
        </div>
      </div>
    )
  }

  async getHistoryData(type, refresh) {
    if (!!!dateConfig[type] || !!!dateConfig[type].chinese) return
    const isNow = dateConfig[type].isNow || false
    const listMapName = isNow ? 'listMapNow' : 'listMapLast'
    const listMap = this.state[listMapName]
    let item

    await this.cancelRequest({ listMap, listMapName, type })
    console.log(this.state[listMapName])
    item = this.state[listMapName][type]
    // 昨日 上周 上月只请求一次数据，所以‘fineshed’状态后将不再请求
    // loading状态时都不再发起请求
    if (
      item.loadingState === 'loading' ||
      (
        !isNow &&
        item.loadingState === 'finished' &&
        refresh !== 'refresh'
      )
    ) {
      return
    }
    item.loadingState = 'loading'
    await this.setState({
      [listMapName]: objectUtils.modifyItem(
        this.state[listMapName], { [type]: item }
      )
    })
    console.log(this.state[listMapName])
    const params = { dateType: type }
    const source = getCancelSource()
    item.cancelSource = source
    getHistoryData(
      params,
      source.cancelToken
    ).then(async e => {
      if (e.state === 'ok') {
        item.data = e.data
        item.loadingState = 'finished'
      } else if (e.state === 'error') {
        item.loadingState = 'timeout'
      } else {
        item.loadingState = 'nodata'
      }
      await this.setState(state => ({
        [listMapName]: objectUtils.modifyItem(
          state[listMapName], { [type]: item }
        )
      }))
      console.log(this.state[listMapName])
    }).catch(err => {
      throw err
    })
  }

  cancelRequest({ listMap, listMapName, type }) {
    Object.keys(listMap).forEach(async key => {
      // 取消此次请求的以外请求
      if (key !== type && listMap[key].cancelSource) {
        // console.log(key, this.state[listMapName])
        this.state[listMapName][key].cancelSource.cancel(CANCEL_MSG)
        const newItem = objectUtils.modifyItem(
          this.state[listMapName][key], {cancelSource: null}
        )

        await this.setState(state => {
          // console.log(state[listMapName], {[key]: newItem}, {
          //   [listMapName]: objectUtils.modifyItem(
          //     state[listMapName], { [key]: newItem }
          //   )
          // })
          return {
            [listMapName]: objectUtils.modifyItem(
              state[listMapName], { [key]: newItem }
            )
          }
        })
        // console.log(this.state[listMapName])
      }
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
