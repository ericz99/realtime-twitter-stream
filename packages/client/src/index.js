import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import './styles/main.css';

import GlobalState from './context/GlobalState';

render(
  <GlobalState>
    <App />
  </GlobalState>,
  document.getElementById('root')
);
