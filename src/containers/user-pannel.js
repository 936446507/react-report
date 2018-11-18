import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import UserPannel from '../page/home/user-pannel/user-pannel'
import * as userInfoActions from '../redux/actions/get-userinfo'

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

const mapStateToProps = stateData => {
  const { userInfo }  = stateData
  // const {
  //   isFetching,
  //   state,
  //   data
  // } = userInfo || {
  //   isFetching: true,
  //   state: '',
  //   data: {
  //     balance: 0,
  //     equity: 0,
  //     formalUserSum: 0,
  //     userSum: 0
  //   }
  // }
  // return {
  //   isFetching,
  //   state,
  //   data
  // }
  return { userInfo }
}

export default connect(mapStateToProps)(UserPannelContainer)
