import React, { Component } from 'react'
import { inject, observer } from "mobx-react"

@inject('PermissionStore')
@observer
class MemberManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }
  render() {
    return (
      <div className="member-manager">
        MemberManager
      </div>
    )
  }
}

export default MemberManager
