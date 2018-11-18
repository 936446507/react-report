import React, { Component } from'react'
import PropTypes from 'prop-types'

class MenuList extends Component {
  static propTypes = {
    menuItemList: PropTypes.array
  }
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const boxItemWidth = 75
    const menuItemList = this.props.menuItemList.filter(item => item.isShow)
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
                  className={ `menu-box--item menu-box--${item.menuRouteName}` }
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
}

export default MenuList
