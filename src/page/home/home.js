import React, { Component } from 'react'

import UserHeader from './user-header/user-header'
import MenuBox from './menu-box/menu-box'
import UserPannel from './user-pannel/user-pannel'
import HistoryList from './history-list/history-list'
import menuList from './menu-list-data'
import './style.scss'

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
        <HistoryList />
      </div>
    );
  }
}

export default Home
