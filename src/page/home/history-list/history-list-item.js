import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Loading } from 'element-react'
import HistoryDataList from './history-data-list'

import { formateDate } from '../../../utils'
import { dateConfig } from '../../../config'

class HistroyListItem extends Component {
  static propTypes = {
    listMap: PropTypes.object.isRequired,
    day: PropTypes.string,  // 默认选中
    isDetails: PropTypes.bool,
    animateSpeed: PropTypes.number,
    getHistoryData: PropTypes.func
  }
  static defaultProps = {
    isDetails: false,
    animateSpeed: 1.2
  }
  constructor(props) {
    super(props)
    this.state = {
      dayType: this.props.day
    }

    this.getHistoryData = this.getHistoryData.bind(this)
    this.getCurHistoryData = this.getCurHistoryData.bind(this)
  }
  render() {
    const { listMap } = this.props
    const { dayType } = this.state
    const currentData = listMap[dayType]
    const loading = currentData.isLoading
    const nowTime = formateDate({fmt: 'HH:mm:ss'})
    const isShowErrorTip =
            loading === 'init' ||
            loading === 'timeout' ||
            loading === 'nodata'
    return (
      <div className="history-list-part-out">
        <div className="history-list-part">
          <div className="tab-list-out">
            <div className="tab-list">
              {
                ((obj) => {
                  let arr = []
                  for (let key in obj) {
                    let keyVal = dateConfig[key].chinese
                    arr.push((
                      <div
                        className={ dayType === key ? 'tab-cell tab-cell-active' : 'tab-cell'}
                        key={ key }
                        onClick={ _ => { this.getHistoryData(key) } }>{ keyVal }
                      </div>
                    ))
                  }
                  return arr
                })(listMap)
              }
            </div>
          </div>
          <div className="history-now-time-out">
            {
              dayType === 'today' && (
                <div className="history-now-time">{ nowTime }</div>
              )
            }
          </div>
          <div className="history-list-contain-out">
            <Loading loading={ this.getLoadingState() === 'loading' }>
              <HistoryDataList data={ currentData.data } />
            </Loading>
            {
              isShowErrorTip && (
                <div className="error-page">
                  { loading === 'timeout' ? '加载失败，点击刷新按钮重新加载' : '点击右下角刷新按钮加载数据' }
                </div>
              )
            }
          </div>
        </div>
        <div className="history-list-part-refresh"></div>
      </div>
    )
  }

  getHistoryData(day, refresh) {
    const { dayType } = this.state
    if (
      this.getLoadingState() === 'loading' &&
      dayType === day
    ) {
      return
    }
    if (day) {
      this.setState({
        dayType: day
      })
    }
    this.props.getHistoryData(day, refresh)
  }
  getCurHistoryData() {
    return this.props.listMap[this.state.dayType]
  }
  getLoadingState() {
    return this.getCurHistoryData().isLoading
  }
}

export default HistroyListItem