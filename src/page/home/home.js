import React, { Component } from 'react'
import { inject, observer } from "mobx-react"

import TheButton from '@/components/button/the-button'
import GoBackButton from '@/components/button/go-back-button'
import UserHeader from './user-header/user-header'
import MenuList from './menu-box/menu-box'
import UserPannel from './user-pannel/user-pannel'
import HistoryList from './history-list/history-list'

import { FLOATTING_BUTTON_SHOW_HEIGHT } from '../../config'
import { scrollToUp } from '@/utils'
import './style.scss'

@inject('UserInfoStore', 'PermissionStore')
@observer
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowScrollTop: false,
      isLoadingUserInfo: false,
      isHadPermissionInfo: false,
      isHadSuccLoadUserInfo: false,
      isErrLoadUserInfo: false,
      isFetchHistoryList: false
    }

    this.getUserInfo = this.getUserInfo.bind(this)
    this.setFetchHistoryListState = this.setFetchHistoryListState.bind(this)
    this.scrollEvent = this.scrollEvent.bind(this)
  }
  render() {
    const { isHadSuccLoadUserInfo, isErrLoadUserInfo, isFetchHistoryList } = this.state
    return (
      <div className="home-page">
        <UserHeader />
        <MenuList />
        <UserPannel />
        {
          isErrLoadUserInfo && !isHadSuccLoadUserInfo &&
          <div className="user-info-error-wrap">
            <div className="user-info-error-tip">
              用户信息加载失败
            </div>
            <div className="user-info-reload-btn">
              <TheButton type="small" click={ this.getUserInfo }>重新加载</TheButton>
            </div>
          </div>
        }
        <HistoryList
          isFetchHistoryList={ isFetchHistoryList }
          setFetchHistoryListState={ this.setFetchHistoryListState } />
        {
          this.state.isShowScrollTop &&
          <GoBackButton click={ scrollToUp }></GoBackButton>
        }
      </div>
    )
  }

  async getUserInfo(type = '') {
    const { isLoadingUserInfo, isHadPermissionInfo, isHadSuccLoadUserInfo } = this.state
    if (isLoadingUserInfo) return
    if (!isHadPermissionInfo) {
      await this.props.PermissionStore.getPermission()
      await this.setState({
        isHadPermissionInfo: true
      })
    }
    if (!isHadSuccLoadUserInfo || type === 'reload') {
      try {
        this.setState({
          isLoadingUserInfo: true
        })
        const e = await this.props.UserInfoStore.getUserInfo()
        this.setState({
          isLoadingUserInfo: false,
          isFetchHistoryList: true
        })
        if (e.state === 'ok') {
          this.setState({
            isHadSuccLoadUserInfo: true
          })
        } else if (e.state === 'error') {
          this.setState({
            isErrLoadUserInfo: true
          })
        }
      } catch (err) {
        this.setState({
          isLoadingUserInfo: false
        })
        throw err
      }
    }
  }

  setFetchHistoryListState(state = false) {
    this.setState({
      isFetchHistoryList: state
    })
  }

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

export default Home