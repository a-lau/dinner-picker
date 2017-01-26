import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import client from './client.js';
import './index.css';
import '../semantic/dist/semantic.min.css';

ReactDOM.render(
  <client />,
  document.getElementById('root')
);
