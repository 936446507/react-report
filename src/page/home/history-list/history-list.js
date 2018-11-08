import React, { Component } from 'react'
import { Switch } from 'element-react'

import HistoryListItem from './history-list-item'

// import './history-list.scss'

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
                onChange={(value)=>{this.setState({isDetails: value})}} />
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

  componentDidMount() {
  }
}

export default HistroyList