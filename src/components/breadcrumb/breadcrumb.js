import React, { Component } from 'react'

// import './breadcrumb.scss'

class Breadcrumb extends Component {
  render() {
    return (
      <div className="agent-tip-wrap agent-tip-wrap">
        <ul className="agent-tip" style={{width: '237px'}}>
          <li className="agent-tip-item">
            <div className="agent-name">
              总公司
            </div>
            <div className="arrow">
              >
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

export default Breadcrumb