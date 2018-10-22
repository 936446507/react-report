import React, { Component } from 'react'

import UserHeader from './user-header/user-header'
import MenuBox from './menu-box/menu-box'
import UserPannel from './user-pannel/user-pannel'

import menuList from './menu-list-data'
import './home.scss'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="home-page">
        <UserHeader />
        <MenuBox menuItemList={ menuList } />
        <UserPannel />
      </div>
    );
  }
}

export default Home
