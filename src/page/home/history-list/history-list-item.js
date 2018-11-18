import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Loading } from 'element-react'
import HistoryDataList from './history-data-list'

import formateDate from '../../../utils/formate-date'
import { dateConfig } from '../../../config'

class HistroyListItem extends Component {
  static propTypes = {
    listMap: PropTypes.object.isRequired,
    day: PropTypes.string,
    isDetails: PropTypes.bool,
    animateSpeed: PropTypes.number
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
}

export default HistroyListItem