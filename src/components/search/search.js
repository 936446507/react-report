import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './search.scss'

class Search extends Component {
  static propTypes = {
    isShowTree: PropTypes.bool,
    setTreeState: PropTypes.func
  }
  static defaultProps = {
    isShowTree: false
  }

  constructor(props) {
    super(props)

    this.state = {
      isShowAgentTreeBtn: true
    }
  }

  render() {
    const { isShowAgentTreeBtn } = this.state
    const { isShowTree, setTreeState } = this.props

    return (
      <div className="search-wrap">
        <div className="search-input-wrap">
          <i className="search-icon"></i>
          <input
            type="text"
            placeholder="搜索"
            className={ isShowAgentTreeBtn ? 'search-input max-width' : 'search-input' } />
          <span className="search-btn"> 清空 </span>
        </div>
        {
          isShowAgentTreeBtn && (
            <div
              className="agent-select-wrap"
              onClick={ _ => { setTreeState(!isShowTree) }}>
              <span className="agent-select-text">代理树</span>
              <i className={ 'arrow-icon ' + (isShowTree ? 'arrow-up-icon' : 'arrow-down-icon')}></i>
            </div>
          )
        }
      </div>
    )
  }

  setAgentTreeBtnState(state = true) {
    this.setState({
      isShowAgentTreeBtn: state
    })
  }
}

export default Search
