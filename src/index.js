import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import 'element-theme-default'
import 'normalize.css'
import './assets/scss/index.scss'

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import configureStore from './store/configure-store'

const store = configureStore()

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
