import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import './index.css';
import '../semantic/dist/semantic.min.css';

import Store from './components/app_store.js';

Store.dispatch({type: "FOO"})
ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
