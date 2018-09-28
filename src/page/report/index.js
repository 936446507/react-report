import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import RouteComponent from '../../components/route-component/index'

class Report extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="report">
        <NavLink to="/report/monthly">monthly</NavLink>
        {
          this.props.routes.map((route, i) => (
            <RouteComponent key={ i } { ...route } />
          ))
        }
      </div>
    );
  }
}

export default Report
