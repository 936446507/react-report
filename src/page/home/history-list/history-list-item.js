import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Loading } from 'element-react'
import HistoryDataList from './history-data-list'

import './history-list-item.scss'
import formateDate from '../../../utils/formate-date'

class HistroyListItem extends Component {
  static propTypes = {
    listMap: PropTypes.object.isRequired,
    day: PropTypes.string.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      dayType: this.props.day
    }
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
                    let keyVal = this.formateDay(key)
                    arr.push((
                      <div
                        className={ dayType === key ? 'tab-cell tab-cell-active' : 'tab-cell'}
                        key={ key }>{ keyVal }
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
            <Loading loading={ loading === 'loading' }>
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

  formateDay(day) {
    switch(day) {
      case 'today':
        return '今日'
      case 'yesterday':
        return '昨日'
      case 'week':
        return '本周'
      case 'month':
        return '本月'
      case 'lastweek':
        return '上周'
      case 'lastmonth':
        return '上月'
      default:
        return '今日'
    }
  }
}

export default HistroyListItem