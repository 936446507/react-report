import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Route } from 'react-router-dom'
import { inject, observer } from "mobx-react"
import { toJS } from 'mobx'
import PropTypes from 'prop-types'

import { setDocTitle, scrollToUp, routePush } from '../../utils'

@inject('UserInfoStore', 'PermissionStore')
@observer
class RouteComponent extends Component {
  static propTypes = {
    route: PropTypes.object,
    Breadcrumb: PropTypes.any,
    agentInfo: PropTypes.object
  }
  static defaultProps = {
    agentInfo: {}
  }
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

  async getPermission() {
    const routeMeta = this.props.route.meta

    if (routeMeta.requirePermission) {
      if (toJS(this.props.UserInfoStore.userInfo).id === '') {
        this.getUserInfo()
      }
      if (this.props.PermissionStore.isFirstLoadPermission) {
        console.log(this.props.PermissionStore.isFirstLoadPermission, this.props.PermissionStore)
        // try {
        //   await this.props.PermissionStore.getPermission()
        //   this.checkPermission(routeMeta)
        // } catch(err) {
        //   throw err
        // }
        this.props.PermissionStore.getPermission()
          .then(e => {
            this.checkPermission(routeMeta)
          })
          .catch(err => {
            throw err
          })
      } else {
        this.checkPermission(routeMeta)
      }
    }
    this.setDocTitle()
  }

  checkPermission(routeMeta) {
    if (
      (
        routeMeta.reportField &&
        !this.props.PermissionStore.reportPermissionMenu.some(item => (
          item.reportField === routeMeta.reportField
        ))
      ) ||
      (
        routeMeta.agentField &&
        !this.props.PermissionStore.agentPermissionMenu.some(item => (
          item.agentField === routeMeta.agentField
        ))
      )
    ) {
      this.goHome()
    }
  }

  getUserInfo() {
    this.props.route.meta.isRequiedLogin &&
    this.props.UserInfoStore.getUserInfo()
  }

  goHome() {
    routePush({ name: 'home' })
  }

  setDocTitle() {
    let docTitle = this.props.route.meta.title || window.baseName
    setDocTitle(docTitle)
  }

  scrollToUp() {
    this.props.route.meta.isScrollTop && scrollToUp()
  }

  enterRouteHandle() {
    console.log(this.props.route.name)
    this.scrollToUp()
    this.getPermission()
  }

  render() {
    const { route, Breadcrumb, agentInfo } = this.props
    return (
      <Route
        path={ route.path }
        render={ props => {
          return (
            <this.props.route.component
              { ...props }
              routes={ route.children }
              agentInfo={ agentInfo }
              onEnter={ this.enterRouteHandle() } >
              { Breadcrumb && <Breadcrumb /> }
            </this.props.route.component>
          )
        }}
        exact={route.path === '/'} />
    )
  }
}

export default withRouter(RouteComponent)
