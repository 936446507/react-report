import React, { Component } from 'react'

class MemberManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      couter: 0
    }

    this.setCouter = this.setCouter.bind(this)
  }
  render() {
    return (
      <div className="member-manager">
        MemberManager
        <button onClick={this.setCouter}>set</button>
      </div>
    );
  }

  async setCouter() {
    await this.setState(prevState => ({
      couter: prevState.couter + 1
    }))
    await this.setState(prevState => ({
      couter: prevState.couter + 2
    }))

    console.log(this.state.couter)
  }
}


export default MemberManager
