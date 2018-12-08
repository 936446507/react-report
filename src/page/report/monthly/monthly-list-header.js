import React, { Component } from 'react'

class MonthlyListHeader extends Component {
  render() {
    return (
      <div className="monthly-list--header">
        <div>
          前期净值
        </div>
        <div>
          期末净值
        </div>
        <div>
          存款
        </div>
        <div>
          总返佣
        </div>
        <div>
          取款
        </div>
        <div>
          信用
        </div>
        <div>
          盈亏
        </div>
        <div>
          商品/gold
        </div>
        <div>
          商品/silver
        </div>
        <div>
          已平仓手数
        </div>
        <div>
          手续费
        </div>
        <div>
          差价返佣
        </div>
        <div>
          操作(详细)
        </div>
      </div>
    )
  }
}

export default MonthlyListHeader