import React, { Component } from 'react'
import { inject, observer } from "mobx-react"

import RouteComponent from '../../components/route-component/index'
import Search from '../../components/search/search'
import NavMenu from '../../components/nav-menu/nav-menu'
import Breadcrumb from '../../components/breadcrumb/breadcrumb'
import Tree from '../../components/tree/tree'

import './report.scss'

@inject('PermissionStore')
@observer
class Report extends Component {
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
    const { isShowTree, searchText } = this.state
    const menuList = this.props.PermissionStore.reportPermissionMenu

    return (
      <div className="report">
        <Search
          isShowTree={ isShowTree }
          setTreeState={ this.setTreeState }
          getSearchText={ this.getSearchText }>
        </Search>
        <NavMenu menuList={ menuList }></NavMenu>
        {
          this.props.routes.map((route, i) => (
            <RouteComponent key={ i } route={{ ...route }} Breadcrumb={ Breadcrumb } />
          ))
        }
        {
          isShowTree && <Tree searchText={ searchText }></Tree>
        }
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

export default Report
