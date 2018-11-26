import React, { Component } from 'react'
import { withRouter } from "react-router"
import { connect } from 'react-redux'
import { compose } from 'redux'

import TheButton from '../../components/button/the-button'
import GoBackButton from '../../components/button/go-back-button'
import UserHeader from '../../containers/user-header'
import MenuList from './menu-box/menu-box'
import UserPannel from '../../containers/user-pannel'
import HistoryList from './history-list/history-list'

import * as userInfoActions from '../../redux/actions/get-userinfo'
import { menuListConfig, FLOATTING_BUTTON_SHOW_HEIGHT } from '../../config'
import './style.scss'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowScrollTop: false
    }

    this.getUserInfo = this.getUserInfo.bind(this)
    this.backTop = this.backTop.bind(this)
    this.scrollEvent = this.scrollEvent.bind(this)
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
        {
          this.state.isShowScrollTop &&
          <GoBackButton click={ this.backTop }></GoBackButton>
        }
      </div>
    )
  }

  getUserInfo() {
    let { dispatch, userInfo } = this.props
    dispatch(userInfoActions.fetchUserInfo(userInfo))
  }

  backTop() {}

  // 滚动触发的事件
  scrollEvent() {
    const top = document.documentElement.scrollTop < document.body.scrollTop
      ? document.body.scrollTop
      : document.documentElement.scrollTop
    this.setState({
      isShowScrollTop: top > FLOATTING_BUTTON_SHOW_HEIGHT
    })
  }

  componentWillMount() {
    this.getUserInfo()
    window.addEventListener('scroll', this.scrollEvent, false)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollEvent)
  }
}

const mapStateToProps = state => {
  const { userInfo }  = state
  return { userInfo }
}

// export default withRouter(connect(mapStateToProps)(Home))
export default compose(withRouter, connect(mapStateToProps))(Home)