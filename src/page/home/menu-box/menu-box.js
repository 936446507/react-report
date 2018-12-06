import React, { Component } from'react'
import { inject, observer } from "mobx-react"
import { toJS } from 'mobx'

import { menuListConfig  } from '../../../config'

@inject('PermissionStore')
@observer
class MenuList extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.getPermissionList = this.getPermissionList.bind(this)
  }

  render() {
    const boxItemWidth = 75
    const menuItemList = this.getPermissionList()
    const boxWidth = menuItemList.length * boxItemWidth
    const locationOrigin = window.location.origin

    return (
      <div className="menu-box-out">
        <div
          className="menu-box"
          style={{ width: boxWidth + 'px' }}>
          {
            menuItemList.map((item, index) => (
              <div
                className="menu-box--content"
                key={ index }>
                <a
                  className={ 'menu-box--item menu-box--' + item.menuRouteName }
                  href={ `${locationOrigin}/${item.parentRouteName}/${item.menuRouteName}` }>
                  <span>{ item.menuText }</span>
                </a>
              </div>
            ))
          }
        </div>
      </div>
    )
  }

  getPermissionList() {
    const agentPermission = toJS(this.props.PermissionStore.agent)
    const reportPermission = toJS(this.props.PermissionStore.report)

    return menuListConfig.filter(item => {
      if (item.reportField && item.isShow) {
        // 各个报表菜单入口
        return reportPermission[item.reportField]
      } else if (item.agentField && item.isShow) {
        // 会员管理菜单入口
        // 会员管理入口显示只有当前端权限与后台权限有一对都为true时才显示
        let isHadSetRouteName = false
        for (let childrenItem of item.children) {
          if (
            childrenItem.isShow &&
            agentPermission[childrenItem.agentField] &&
            !isHadSetRouteName
            ) {
              item.menuRouteName = childrenItem.menuRouteName
              isHadSetRouteName = true
              return true
          }
        }
      }
      return false
    })
  }
}

export default MenuList
