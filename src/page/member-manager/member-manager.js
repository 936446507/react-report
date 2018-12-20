import React, { Component } from 'react'
import { inject, observer } from "mobx-react"

import RouteComponent from '@/components/route-component/index'
import Search from '@/components/search/search'
import NavMenu from '@/components/nav-menu/nav-menu'
import Breadcrumb from '@/components/breadcrumb/breadcrumb'

@inject('PermissionStore')
@observer
class MemberManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowTree: false,
      searchText: ''
    }

    this.setTreeState = this.setTreeState.bind(this)
    this.getSearchText = this.getSearchText.bind(this)
  }
  render() {
    const { isShowTree } = this.state
    const menuList = this.props.PermissionStore.agentPermissionMenu

    return (
      <div className="member-manager">
        MemberManager
        <Search
          isShowTree={ isShowTree }
          setTreeState={ this.setTreeState }
          getSearchText={ this.getSearchText }>
        </Search>
        <NavMenu menuList={ menuList }></NavMenu>
        <div className="member-manage--view">
          {
            this.props.routes.map((route, i) => (
              <RouteComponent key={ i } route={{ ...route }} Breadcrumb={ Breadcrumb } />
            ))
          }
        </div>
      </div>
    )
  }

  setTreeState(state = false) {
    this.setState({
      isShowTree: state
    })
  }
  getSearchText(searchText) {
    this.setState({
      searchText
    })
  }
}

export default MemberManager
