import React, { Component } from 'react'

import RouteComponent from '../../components/route-component/index'

class Report extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="report">
        {
          this.props.routes.map((route, i) => (
            <RouteComponent key={ i } route={{ ...route }} />
          ))
        }
      </div>
    );
  }
}

export default Report
