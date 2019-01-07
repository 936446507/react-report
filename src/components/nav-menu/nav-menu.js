import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import { getCurRoutePath, getStyle } from '@/utils'

import './nav-menu.scss'

class NavMenu extends Component {
  static propTypes = {
    menuList: PropTypes.array
  }
  static defaultProps = {
    menuList: []
  }

  constructor(props) {
    super(props)
    this.state = {}

    this.getIsCurRoute = this.getIsCurRoute.bind(this)
    this.setMenuListWidth = this.setMenuListWidth.bind(this)
  }

  render() {
    const { menuList } = this.props

    return (
      <div className="report-menu-wrapper">
        <div className="report-menu-wrap" ref="reportMenuWrap">
          <ul className="report-menu-list" ref="reportMenuList" >
            {
              menuList.map((item, index) => {
                const path = '/' + item.parentRouteName + '/' + item.menuRouteName
                return (
                  <li className="report-menu-item" key={ index }>
                    <NavLink
                      className="menu-item-link"
                      activeClassName="active"
                      to={ path }
                      isActive={ _ => this.getIsCurRoute(path) }>{ item.menuText }
                    </NavLink>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }

  getIsCurRoute(path) {
    return getCurRoutePath() === path
  }

  setMenuListWidth() {
    const clientWidth = document.body.clientWidth
    const menuItem = this.refs.reportMenuList.children
    const reportMenuListPadding = getStyle(this.refs.reportMenuWrap, 'padding-left')
    let width = 0
    for (let item of menuItem) {
      let marginLeft = getStyle(item, 'margin-left')
      width += Math.ceil(item.getBoundingClientRect().width) + marginLeft
    }
    if (reportMenuListPadding + width <= clientWidth) {
      return false
    }

    this.refs.reportMenuList.style.width = width + 'px'
  }

  componentDidUpdate() {
    this.setMenuListWidth()
  }
}

export default NavMenu
