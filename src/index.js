import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux'

import 'element-theme-default'
import 'normalize.css'
import './assets/scss/index.scss'

import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import configureStore from './redux/store/configure-store'

// const store = configureStore()

import { Provider } from 'mobx-react'
import stores from './mobx'

ReactDOM.render(
  <Provider { ...stores }>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
