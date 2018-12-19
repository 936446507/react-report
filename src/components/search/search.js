import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './search.scss'

class Search extends Component {
  static propTypes = {
    isShowTree: PropTypes.bool,
    setTreeState: PropTypes.func,
    setSearchText: PropTypes.func
  }
  static defaultProps = {
    isShowTree: false
  }

  constructor(props) {
    super(props)

    this.state = {
      isShowAgentTreeBtn: true,
      searchText: ''
    }

    this.setAgentTreeBtnState = this.setAgentTreeBtnState.bind(this)
    this.clearSearchText = this.clearSearchText.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  render() {
    const { isShowAgentTreeBtn, searchText } = this.state
    const { isShowTree, setTreeState } = this.props

    return (
      <div className="search-wrap">
        <div className={ !isShowAgentTreeBtn ? 'search-input-wrap input-focus' : 'search-input-wrap'}>
          <i className="search-icon"></i>
          <input
            type="text"
            placeholder="搜索"
            name="searchText"
            className={ isShowAgentTreeBtn ? 'search-input max-width' : 'search-input' }
            value={ searchText }
            onChange={ this.handleInput }
            onFocus={ _ => this.setAgentTreeBtnState(false) }
            onBlur={ _ => this.setAgentTreeBtnState(true) } />
          <span className="search-btn" onClick={ this.clearSearchText }> 清空 </span>
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
    !state && this.props.setTreeState(!state)
  }

  clearSearchText() {
    this.setState(() => {
      return {
        searchText: ''
      }
    })
  }

  handleInput(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }
}

export default Search
