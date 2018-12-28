import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { toSuperNumber, toFix } from '@/utils'

class MonthlyListCell extends Component {
  static propTypes = {
    data: PropTypes.object,
    isDetail: PropTypes.bool
  }
  static defaultProps = {
    data: {},
    isDetail: false
  }
  constructor(props) {
    super(props)
    this.state = {}

    this.filter = this.filter.bind(this)
  }
  render() {
    let { data, isDetail } = this.props
    data = this.filter(data)

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
        <div class="report-directly-all">
          <button class="directly">直属</button>
          <span class="interval">|</span>
          <button class="all">全部</button>
        </div>
      </div>
    )
  }

  filter(data) {
    data.prequity = toSuperNumber(data.prequity)
    data.equity = toSuperNumber(data.equity)
    data.commissionRebateSum = toSuperNumber(data.commissionRebateSum)
    data.commissionRebate = toSuperNumber(data.commissionRebate)
    data.withdr = toSuperNumber(data.withdr)
    data.credit = toSuperNumber(data.credit)
    data.profitloss = toSuperNumber(data.profitloss)
    data.gold = toFix(data.gold)
    data.silver = toFix(data.silver)
    data.turnover = toFix(data.turnover)
    data.commission = toSuperNumber(data.commission)
    data.commissionRebate = toSuperNumber(toFix(data.commissionRebate))

    return data
  }
}

export default MonthlyListCell