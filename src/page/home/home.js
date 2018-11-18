import React, { Component } from 'react'
import { withRouter } from "react-router"
import { connect } from 'react-redux'
import { compose } from 'redux'

import TheButton from '../../components/button/the-button'
import UserHeader from '../../containers/user-header'
import MenuList from './menu-box/menu-box'
import UserPannel from '../../containers/user-pannel'
import HistoryList from './history-list/history-list'

import * as userInfoActions from '../../redux/actions/get-userinfo'
import { menuListConfig } from '../../config'
import './style.scss'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}

    this.getUserInfo = this.getUserInfo.bind(this)
  }
  render() {
    return (
      <div className="home-page">
        <UserHeader />
        <MenuList menuItemList={ menuListConfig } />
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

  getUserInfo() {
    let { dispatch, userInfo } = this.props
    dispatch(userInfoActions.fetchUserInfo(userInfo))
  }

  componentWillMount() {
    this.getUserInfo()
  }
}

const mapStateToProps = state => {
  const { userInfo }  = state
  return { userInfo }
}

// export default withRouter(connect(mapStateToProps)(Home))
export default compose(withRouter, connect(mapStateToProps))(Home)