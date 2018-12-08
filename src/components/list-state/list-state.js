import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TheButton from '../button/the-button'

import './list-state.scss'

class ListState extends Component {
  static propTypes = {
    state: PropTypes.string,
    reload: PropTypes.func
  }
  static defaultProps = {
    state: 'success'
  }
  render() {
    const { state } = this.props

    return (
      <div className="list-state">
        {
          state === 'nodata' && (
            <div className="list-nodata tip">
              <span className="list-nodata--msg tip-msg">没有数据</span>
            </div>
          )
        }
        {
          state === 'error' && (
            <div className="list-error tip">
              <span className="list-error--msg tip-msg">请求数据失败</span>
              <TheButton click={ this.props.reload }>点击刷新</TheButton>
            </div>
          )
        }
      </div>
    )
  }
}

export default ListState