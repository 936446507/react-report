import React, { Component } from 'react'

import './search.scss'

class Search extends Component {
  render() {
    return (
      <div className="search-wrap">
        <div className="search-input-wrap">
          <i className="search-icon"></i>
          <input type="text" placeholder="搜索" className="search-input max-width" />
          <span className="search-btn"> 清空 </span>
        </div>
        <div className="agent-select-wrap">
          <span className="agent-select-text">代理树</span>
          <i className="arrow-icon arrow-down-icon"></i>
        </div>
      </div>
    )
  }
}

export default Search
