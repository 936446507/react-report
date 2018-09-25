import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Home from './page/home/index'
import Login from './page/login/index'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Route path="/" component={Home} exact />
          <Route path="/login" component={Login} exact />
        </div>
      </Router>
    );
  }
}

export default App
