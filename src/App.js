import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

// import AppHeader from './components/app-header/index'
import RouteComponent from './components/route-component/index'

import { routes } from './routes/index'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app">
          {/* <AppHeader /> */}
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
