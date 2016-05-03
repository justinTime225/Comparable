import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/AppContainer';
import PostIndex from './components/posts_index';


function requireAuth(nextState, replace) {
  var authenticated = localStorage.getItem('id_token') ? true : false;
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
    <Route path="/test" component={PostIndex} onEnter={requireAuth} />
  </Route>
);
