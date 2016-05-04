import React, { Component } from 'react';
import {connect} from 'react-redux';
import { loginUser } from '../actions/Auth_Actions';
import Login from '../components/Login';
import Navbar from '../components/Navbar';
import { Link } from 'react-router';

class App extends Component {
  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props;

    return (
      <div>
        <Navbar
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
          dispatch={dispatch}
        />
        <Link to="/offers">Link to offer</Link>
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated, errorMessage } = auth;

  return {
    isAuthenticated,
    errorMessage,
  };
};

export default connect(mapStateToProps)(App);
