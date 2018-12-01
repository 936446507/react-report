import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import UserHeader from '../page/home/user-header/user-header'
import * as userInfoActions from '../redux/actions/get-userinfo'

class UserHeaderContainer extends Component {
  render() {
    const { userInfo, dispatch } = this.props
    return (
      <UserHeader
        userInfo={ userInfo.data }
        { ...bindActionCreators(userInfoActions, dispatch) } />
    )
  }
}

const mapStateToProps = state => {
  const { userInfo }  = state
  return { userInfo }
}

// export default connect(mapStateToProps)(UserHeaderContainer)
export default UserHeaderContainer
