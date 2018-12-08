import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { inject, observer } from "mobx-react"
import { toJS } from 'mobx'

import { setDocTitle, scrollToUp, routePush } from '../../utils'

@inject('UserInfoStore', 'PermissionStore')
@observer
class RouteComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.getPermission = this.getPermission.bind(this)
    this.getUserInfo = this.getUserInfo.bind(this)
    this.goHome = this.goHome.bind(this)
    this.setDocTitle = this.setDocTitle.bind(this)
    this.scrollToUp = this.scrollToUp.bind(this)
    this.enterRouteHandle = this.enterRouteHandle.bind(this)
  }

  getPermission() {
    const routeMeta = this.props.route.meta
    if (routeMeta.requirePermission) {
      if (toJS(this.props.UserInfoStore.userInfo).id === '') {
        this.getUserInfo()
      }
      if (this.props.PermissionStore.isFirstLoadPermision) {
        this.props.PermissionStore.getPermission()
          .then(e => {
            // this.goHome(routeMeta)
          })
          .catch(err => {
            throw err
          })
      } else {
        // this.goHome(routeMeta)
      }
    }
    this.setDocTitle()
  }
  getUserInfo() {
    this.props.route.meta.isRequiedLogin &&
    this.props.UserInfoStore.getUserInfo()
  }
  goHome(routeMeta) {
    const reportPermission = toJS(this.props.PermissionStore.report)
    const agentPermission = toJS(this.props.PermissionStore.agent)
    if (
      (routeMeta.reportField && !reportPermission[routeMeta.reportField]) ||
      (routeMeta.agentField && !agentPermission[routeMeta.agentField])
    ) {
      routePush({ name: 'home' })
    }
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
    this.getPermission()
    // this.setDocTitle()
    // this.getUserInfo()
  }

  render() {
    const { route, Breadcrumb } = this.props
    return (
      <Route
        path={ route.path }
        render={ props => {
          console.log(this.props)
          return (
            <this.props.route.component
              { ...props }
              routes={ route.children }
              onEnter={ this.enterRouteHandle() } >
              { Breadcrumb && <Breadcrumb /> }
            </this.props.route.component>
          )
        }}
        exact={route.path === '/'} />
    )
  }
}

export default RouteComponent
