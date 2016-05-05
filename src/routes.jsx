import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/AppContainer';
import Offer from './containers/OfferContainer';
import Home from './components/Home';

function requireAuth(nextState, replace) {
  var authenticated = localStorage.getItem('id_token') ? true : false;
  console.log('changing state', nextState);
  if (!authenticated) {
    console.log('routing back to home');
    replace({
      pathname: '/',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

// TODO: Build the Main page component and add it as IndexRoute here

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="offers" component={Offer} onEnter={requireAuth} />
  </Route>
);
