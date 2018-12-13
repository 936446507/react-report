import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import { getCurRoutePath } from '../../utils'
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
  }

  render() {
    const { menuList } = this.props

    return (
      <div className="report-menu-wrapper">
        <div className="report-menu-wrap" routename="monthly">
          <ul className="report-menu-list" style={{ width: '836px'}}>
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
    
  }
}

export default NavMenu
