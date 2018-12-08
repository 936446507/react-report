import React, { Component } from 'react'
import { inject, observer } from "mobx-react"
// import { toJS } from 'mobx'

import './nav-menu.scss'

@inject('PermissionStore')
@observer
class NavMenu extends Component {
  render() {
    return (
      <div className="report-menu-wrapper">
        <div className="report-menu-wrap" routename="monthly">
          <ul className="report-menu-list" style={{ width: '836px'}}>
          <li className="report-menu-item"><a href="#/report/monthly" className="menu-item-link router-link-exact-active active"> 月结报表 </a></li>
          <li className="report-menu-item"><a href="#/report/profit-loss" className="menu-item-link"> 盈亏报表 </a></li>
          <li className="report-menu-item"><a href="#/report/equity" className="menu-item-link"> 净值报表 </a></li>
          <li className="report-menu-item"><a href="#/report/open" className="menu-item-link"> 未平仓报表 </a></li>
          <li className="report-menu-item"><a href="#/report/close" className="menu-item-link"> 已平仓报表 </a></li>
          <li className="report-menu-item"><a href="#/report/deposit" className="menu-item-link"> 存取款报表 </a></li>
          <li className="report-menu-item"><a href="#/report/turnover" className="menu-item-link"> 交易量报表 </a></li>
          <li className="report-menu-item"><a href="#/report/settle" className="menu-item-link"> 结算报表 </a></li>
          <li className="report-menu-item"><a href="#/report/intermedie" className="menu-item-link"> 中介商报表 </a></li>
          </ul>
        </div>
      </div>
    )
  }
}

export default NavMenu
