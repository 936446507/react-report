import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './the-button.scss'

class TheButton extends Component {
  static propTypes = {
    type: PropTypes.string
  }
  static defaultProps = {
    type: 'normal'
  }
  render() {
    return (
      <div className="the-btn-wrap">
        <div className={ 'the-btn ' + this.props.type }>
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default TheButton