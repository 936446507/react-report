import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class AppHeader extends Component {
  render() {
    return (
      <div className="app-header">
        <NavLink to="/">home</NavLink>
        <NavLink to="/report">report</NavLink>
        <NavLink to="/memberManager">memberManager</NavLink>
      </div>
    );
  }
}

export default AppHeader
