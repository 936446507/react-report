import React, { Component } from 'react'
import { inject, observer } from "mobx-react"

import RouteComponent from '@/components/route-component/index'
import Search from '@/components/search/search'
import NavMenu from '@/components/nav-menu/nav-menu'
import Breadcrumb from '@/components/breadcrumb/breadcrumb'

// import './member-manager.scss'

@inject('PermissionStore')
@observer
class MemberManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowTree: false,
      searchText: '',
      agentTipData: []
    }

    this.setTreeState = this.setTreeState.bind(this)
    this.getSearchText = this.getSearchText.bind(this)
  }
  render() {
    const { isShowTree, agentTipData } = this.state
    const menuList = this.props.PermissionStore.agentPermissionMenu
    const curAgentTipData = agentTipData[agentTipData.length - 1]

    return (
      <div className="member-manager">
        <Search
          isShowTree={ isShowTree }
          setTreeState={ this.setTreeState }
          getSearchText={ this.getSearchText }>
        </Search>
        <NavMenu menuList={ menuList }></NavMenu>
        <Breadcrumb></Breadcrumb>
        <div className="member-manage--view">
          {
            this.props.routes.map((route, i) => (
              <RouteComponent
                key={ i }
                route={{ ...route }}
                agent={ curAgentTipData } />
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
