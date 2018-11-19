import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import * as userInfoActions from '../../redux/actions/get-userinfo'
import { setDocTitle, scrollToUp } from '../../utils'

class RouteComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.setDocTitle = this.setDocTitle.bind(this)
    this.scrollToUp = this.scrollToUp.bind(this)
    this.getUserInfo = this.getUserInfo.bind(this)
    this.enterRouteHandle = this.enterRouteHandle.bind(this)
  }

  getUserInfo() {
    const { userInfo, dispatch } = this.props
    dispatch(userInfoActions.fetchUserInfo(userInfo))
  }
  setDocTitle() {
    let docTitle = this.props.route.meta.title || window.baseName
    setDocTitle(docTitle)
  }
  scrollToUp() {
    this.props.route.meta.isScrollTop && scrollToUp()
  }
  enterRouteHandle() {
    this.scrollToUp()
    this.setDocTitle()
    // this.props.route.name === 'home' && this.getUserInfo()
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

export default connect()(RouteComponent)
