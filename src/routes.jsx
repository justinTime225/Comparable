import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/AppContainer';
import Offer from './containers/OfferContainer';
import Home from './components/Home';

function requireAuth(nextState, replace) {
  // Checks to see if the user is authenticated
  var authenticated = localStorage.getItem('id_token') ? true : false;

  // Protect the routes
  if (!authenticated) {
    // Route back to home if unathenticated
    replace({
      pathname: '/',
      state: {
        nextPathname: nextState.location.pathname,
      },
    });
  }
}

// Export router so that we can use it within index
export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path="offers" component={Offer} onEnter={requireAuth} />
  </Route>
);
