import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import RouteComponent from './components/route-component/index'

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
        </div>
      </Router>
    )
  }
}

export default App
