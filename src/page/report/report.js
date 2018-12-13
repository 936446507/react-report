import React, { Component } from 'react'
import { inject, observer } from "mobx-react"

import RouteComponent from '../../components/route-component/index'
import Search from '../../components/search/search'
import NavMenu from '../../components/nav-menu/nav-menu'
import Breadcrumb from '../../components/breadcrumb/breadcrumb'

import './report.scss'

@inject('PermissionStore')
@observer
class Report extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const menuList = this.props.PermissionStore.reportPermissionMenu
    return (
      <div className="report">
        <Search></Search>
        <NavMenu menuList={ menuList }></NavMenu>
        {
          this.props.routes.map((route, i) => (
            <RouteComponent key={ i } route={{ ...route }} Breadcrumb={ Breadcrumb } />
          ))
        }
      </div>
    );
  }
}

export default Report
