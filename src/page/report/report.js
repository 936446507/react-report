import React, { Component } from 'react'

import RouteComponent from '../../components/route-component/index'
import Search from '../../components/search/search'
import NavMenu from '../../components/nav-menu/nav-menu'
import Breadcrumb from '../../components/breadcrumb/breadcrumb'

import './report.scss'

class Report extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="report">
        <Search></Search>
        <NavMenu></NavMenu>
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
