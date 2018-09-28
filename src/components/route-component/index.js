import React, { Component } from 'react'
import { Route } from 'react-router-dom'

class RouteComponent extends Component {
  render() {
    return (
      <Route
        path={ this.props.path }
        render={ props => (
          <this.props.component
            { ...props }
            routes={ this.props.children }
            exact />
        )}
      />
    )
  }
}

export default RouteComponent
