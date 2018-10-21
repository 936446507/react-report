import React, { Component } from'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import './menu-box.scss'

class MenuBox extends Component {
  static propTypes = {
    menuItemList: PropTypes.array
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const boxItemWidth = 75
    const menuItemList = this.props.menuItemList
    const boxWidth = menuItemList.length * boxItemWidth
    const permissionList = menuItemList
    return (
      <div className="menu-box-out">
        <div
          className="menu-box"
          style={{ width: boxWidth + 'px'}}>
          {
            permissionList.map((item, index) => (
              <div
                className="menu-box--content"
                key={ index }>
                <NavLink
                  className={ 'menu-box--item menu-box--' + item.menuRouteName }
                  to="/">
                  <span>{ item.menuText }</span>
                </NavLink>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default MenuBox
