import React from 'react';
import { Route, IndexRoute } from 'react-router';
// route use to define a match between url and component
import App from './components/app';
import PostsIndex from './components/posts_index';


export default (
  <Route path='/' component={App}>
    <IndexRoute component={PostsIndex} />
    
  </Route>
);