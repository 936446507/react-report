import React, { Component } from 'react'
import { HashRouter as Router } from 'react-router-dom'

import DevTools from 'mobx-react-devtools'
import RouteComponent from './components/route-component/index'

import { isDev } from './api/api'
import { routes } from './routes/index'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app page">
          {
            routes.map((route, i) => (
              <RouteComponent key={ i } route={{ ...route }} />
            ))
          }
          {
            isDev && <DevTools></DevTools>
          }
        </div>
      </Router>
    )
  }
}

export default App
