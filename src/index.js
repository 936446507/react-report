import React from 'react';
import ReactDOM from 'react-dom';

import 'element-theme-default'
import 'normalize.css'
import './assets/scss/index.scss'

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
