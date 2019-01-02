import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { toSuperNumber, toFix } from '@/utils'

class MonthlyListCell extends Component {
  static propTypes = {
    data: PropTypes.object,
    isDetail: PropTypes.bool,
    changeReportListType: PropTypes.func
  }
  static defaultProps = {
    data: {},
    isDetail: false
  }
  constructor(props) {
    super(props)
    this.state = {}

    this.changeReportListType = this.changeReportListType.bind(this)
    this.formateData = this.formateData.bind(this)
  }
  render() {
    let { data, isDetail } = this.props
    data = this.formateData(data)

    return (
      <div className="monthly-list--cell">
        {/* 代理商 */}
        <div>{ data.aname || data.login || '--' }</div>
        {/* 姓名/1 */}
        { isDetail && <div>{ data.Name || '---'}</div> }
        {/* 所属代理商/1 */}
        { isDetail && <div>{ data.agentname || '---'}</div> }
        {/* 前期净值 */}
        <div>{ data.prequity }</div>
        {/* 期末净值 */}
        <div>{ data.equity }</div>
        {/* 存款 */}
        <div>{ data.deposit }</div>
        {/* 总返佣/0 */}
        { !isDetail && <div>{ data.commissionRebateSum }</div> }
        {/* 返佣/1 */}
        { isDetail && <div>{ data.commissionRebate }</div> }
        {/* 取款 */}
        <div>{ data.withdr }</div>
        {/* 信用 */}
        <div>{ data.credit }</div>
        {/* 盈亏 */}
        <div>{ data.profitloss }</div>
        {/* gold */}
        <div>{ data.gold }</div>
        {/* silver */}
        <div>{ data.silver }</div>
        {/* 已平仓手数 */}
        <div>{ data.turnover }</div>
        {/* 手续费 */}
        <div>{ data.commission }</div>
        {/* 差价返佣/0 */}
        { !isDetail && <div>{ data.commissionRebate }</div> }
        {/* 操作(详细)/0 */}
        {
          !isDetail &&
          <div className="report-directly-all">
            <button
              className="directly"
              onClick={ _ => this.changeReportListType(true) }>直属
            </button>
            <span className="interval">|</span>
            <button
              className="all"
              onClick={ _ => this.changeReportListType(false) }>全部
            </button>
          </div>
        }
      </div>
    )
  }

  changeReportListType(isDirect = false) {
    const { data, changeReportListType } = this.props
    changeReportListType(data.aid, isDirect)
  }

  formateData(data) {
    [
      'prequity', 'equity', 'commissionRebateSum', 'commissionRebate',
       'withdr', 'credit', 'profitloss', 'commission'
    ].forEach(key => {
      data[key] = toSuperNumber(data[key])
    });

    [ 'gold', 'silver', 'turnover' ].forEach(key => {
      data[key] = toFix(data[key])
    });

    [ 'commissionRebate' ].forEach(key => {
      data[key] = toSuperNumber(toFix(data[key]))
    });

    return data
  }
}

export default MonthlyListCell