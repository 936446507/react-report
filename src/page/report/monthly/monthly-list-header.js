import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MonthlyListHeader extends Component {
  static propTypes = {
    isDetail: PropTypes.bool
  }
  static defaultProps = {
    isDetail: false
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const { isDetail } = this.props

    return (
      <div className="monthly-list--header">
        { isDetail && <div>姓名</div> }
        { isDetail && <div>所属代理商</div> }
        <div>前期净值</div>
        <div>期末净值</div>
        <div>存款</div>
        { !isDetail && <div>总返佣</div>}
        { isDetail && <div>返佣</div> }
        <div>取款</div>
        <div>信用</div>
        <div>盈亏</div>
        <div>商品/gold</div>
        <div>商品/silver</div>
        <div>已平仓手数</div>
        <div>手续费</div>
        { !isDetail && <div>差价返佣</div> }
        { !isDetail && <div>操作(详细)</div> }
      </div>
    )
  }
}

export default MonthlyListHeader