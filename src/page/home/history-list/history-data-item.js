import React, { Component } from 'react'
import PropTypes from 'prop-types'

class HistoryDataItem extends Component {
  static propTypes = {
    title: PropTypes.string,
    addClass: PropTypes.bool,
    content: PropTypes.node,
    detailLeftContent: PropTypes.node,
    detailRightContent: PropTypes.node
  }
  static defaultProps = {
    addClass: false
  }
  render() {
    const {
      title,
      addClass,
      content,
      detailLeftContent,
      detailRightContent
    } = this.props
    return (
      <div className="history-list-block">
        <h3 className="history-list-title">{ title }</h3>
        <div className="history-list-content">
        <div className="content">{ content }</div>
        <div className={ addClass ? 'add-content' : 'remove-content' }>
          { detailLeftContent }
          { detailRightContent }
        </div>
        </div>
      </div>
    )
  }
}

export default HistoryDataItem