import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import RouteComponent from './components/route-component/index'
import ReduxDevTools from './containers/redux-dev-tools'

import { routes } from './routes/index'
import { isDev } from './api/api'

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
            isDev &&
            window.isShowReduxDevTools &&
            <ReduxDevTools />
          }
        </div>
      </Router>
    )
  }
}

export default App
