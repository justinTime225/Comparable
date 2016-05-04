import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, hashHistory } from 'react-router';
import reducers from './reducers';
import routes from './routes';
import promise from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import './styles/app.scss';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, promise)(createStore);

let store = createStoreWithMiddleware(reducers);

let rootElement = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>{routes}</Router>
  </Provider>,
  rootElement);
