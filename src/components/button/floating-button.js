import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { setClassName } from '../../utils'

import './floating-button.scss'

class FloatingButton extends Component {
  static propTypes = {
    size: PropTypes.string,
    click: PropTypes.func
  }
  static defaultProps = {
    type: 'normal'
  }
  render() {
    const { size, click } = this.props
    const buttonClassName = setClassName({
      'floating-button': true,
      [size]: true
    })
    return (
      <div
        className={ buttonClassName }
        onClick={ _ => click()}>
        { this.props.children }
      </div>
    )
  }
}

export default FloatingButton
