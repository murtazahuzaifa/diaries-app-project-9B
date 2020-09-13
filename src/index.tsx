import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import store from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import {runServer} from './services/mirage/mirageServer';

runServer();

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root')
);