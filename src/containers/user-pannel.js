import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import UserPannel from '../page/home/user-pannel/user-pannel'
import * as userInfoActions from '../actions/get-userinfo'

class UserPannelContainer extends Component {
  render() {
    const { userInfo, dispatch } = this.props
    return (
      <UserPannel
        userInfo={ userInfo.data }
        isFetching={ userInfo.isFetching }
        { ...bindActionCreators(userInfoActions, dispatch) } />
    )
  }
}

const mapStateToProps = state => {
  const { userInfo }  = state
  return { userInfo }
}

export default connect(mapStateToProps)(UserPannelContainer)
