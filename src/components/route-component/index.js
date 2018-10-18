import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import { setDocTitle } from '../../utils/routes/index'

class RouteComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.setDocTitle = this.setDocTitle.bind(this)
    this.enterRouteHandle = this.enterRouteHandle.bind(this)
  }
  setDocTitle() {
    let docTitle = this.props.route.meta.title || window.baseName
    setDocTitle(docTitle)
  }
  enterRouteHandle() {
    this.setDocTitle()
  }
  render() {
    let route = this.props.route
    return (
      <Route
        path={ route.path }
        render={ props => (
          <this.props.route.component
            { ...props }
            routes={ route.children }
            onEnter={ this.enterRouteHandle() } />
        )}
        exact={route.path === '/'} />

    )
  }
}

export default RouteComponent
