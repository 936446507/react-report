import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchUserInfo } from '../../actions'

class MemberManager extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="member-manager">
        MemberManager
      </div>
    );
  }

  componentDidMount() {
    const { dispatch, userInfo } = this.props
    dispatch(fetchUserInfo(userInfo))
  }
}

const mapStateToProps = state => {
  const { userInfo } = state
  return { userInfo }
}

export default connect(mapStateToProps)(MemberManager)
