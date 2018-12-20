import React, { Component } from 'react'
import { inject, observer } from "mobx-react"
import { toJS } from 'mobx'

import RouteComponent from '@/components/route-component/index'
import Search from '@/components/search/search'
import NavMenu from '@/components/nav-menu/nav-menu'
import Breadcrumb from '@/components/breadcrumb/breadcrumb'

@inject('UserInfoStore', 'PermissionStore')
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

    const agentInfo = curAgentTipData && curAgentTipData.id ?
      curAgentTipData :
      toJS(this.props.UserInfoStore.userInfo)

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
              <RouteComponent
                key={ i }
                route={{ ...route }}
                agentInfo={ agentInfo }
                Breadcrumb={ Breadcrumb } />
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
