import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

import ReduxDevTools from '../../containers/redux-dev-tools'

import rootReducer from '../reducers'

const middleware = [ thunk ]
middleware.push(createLogger())

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  compose(
    applyMiddleware(...middleware),
    ReduxDevTools.instrument()
  )
)

export default configureStore