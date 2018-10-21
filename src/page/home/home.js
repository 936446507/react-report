import React, { Component } from 'react'

import UserHeader from './user-header'
import MenuBox from './menu-box'

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
      </div>
    );
  }
}

export default Home
