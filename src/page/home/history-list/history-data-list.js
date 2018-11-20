import React, { Component } from 'react'
import PropTypes from 'prop-types'

import HistoryDataItem from './history-data-item'

import { formateNum } from '../../../utils'

class HistoryDataList extends Component {
  static propTypes = {
    data: PropTypes.object,
    isDetails: PropTypes.bool
  }
  static defaultProps = {
    isDetails: false
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { data, isDetails } = this.props
    const formateData = {}
    for (let key in data) {
      formateData[key] = formateNum({ num: data[key]})
    }

    const goldDetail = <span>黄金 { formateData.gold }</span>
    const sivilerDetail = <span>白银 { formateData.siviler }</span>
    const depositDetail = <span>存款 { formateData.deposit }</span>
    const withdrawDetail = <span>取款 { formateData.withdr }</span>
    return (
      <div className="history-list-contain">
        <HistoryDataItem
          title="手数"
          addClass={ isDetails }
          content={ data.turnover ? data.turnover : '0' }
          detailLeftContent={ goldDetail }
          detailRightContent={ sivilerDetail }>
        </HistoryDataItem>
        {
          data.money &&
          <HistoryDataItem
            title="已结算金额"
            content={ formateData.money }>
          </HistoryDataItem>
        }
        <HistoryDataItem
          title="浮动盈亏"
          content={ formateData.profitloss }>
        </HistoryDataItem>
        <HistoryDataItem
          title="净存款"
          addClass={ isDetails }
          content={ formateData.netDeposit }
          detailLeftContent={ depositDetail }
          detailRightContent={ withdrawDetail }>
        </HistoryDataItem>
      </div>
    )
  }
}

export default HistoryDataList
