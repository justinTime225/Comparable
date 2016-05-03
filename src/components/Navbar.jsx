import React, { Component, PropTypes } from 'react';
import Login from './Login';
import Logout from './Logout'
import { login, logoutUser } from '../actions/Auth_Actions';

export default class Navbar extends Component {
  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props;
    console.log(isAuthenticated);

    // Will display the Login component if the user is not authenticated, Logout otherwise
    return (
      <nav className="navbar navbar-deault">
        <div className="container-fluid">
          <a href="#" className="navbar-brand">Comparable</a>
          <div className="navbar-form">
            {!isAuthenticated && 
              <Login
                errorMessage={errorMessage}
                onLoginClick={() => dispatch(login())}
              />
            }

            {isAuthenticated &&
              <Logout onLogoutClick={() => dispatch(logoutUser())} />
            }
          </div>
        </div>
      </nav>
    );
  }
};

Navbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};
