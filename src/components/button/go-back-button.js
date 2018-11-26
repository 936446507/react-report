import React, { Component } from 'react'
import PropTypes from 'prop-types'

import FloatingButton from './floating-button'
import './go-back-button.scss'

class GoBackButton extends Component {
  static propTypes = {
    isDetail: PropTypes.bool,
    click: PropTypes.func
  }
  static defaultProps = {
    isDetail: false
  }
  render() {
    return (
      <div className="back-top-btn-wrap">
        <FloatingButton
          size="small"
          click={ this.props.click }>
          <i className="el-icon-arrow-up"></i>
        </FloatingButton>
      </div>
    )
  }
}

export default GoBackButton
