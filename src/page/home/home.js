import React, { Component } from 'react'

import TheButton from '../../components/button/the-button'
import UserHeader from '../../containers/user-header'
import MenuBox from './menu-box/menu-box'
import UserPannel from '../../containers/user-pannel'
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
        <div className="user-info-error-wrap" style={{ display:  'none'}}>
          <div className="user-info-error-tip">
            用户信息加载失败
          </div>
          <div className="user-info-reload-btn">
            <TheButton type="small">重新加载</TheButton>
          </div>
          </div>
        <HistoryList />
      </div>
    )
  }
}

export default Home
