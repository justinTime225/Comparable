import React, { Component, PropTypes } from 'react';
import Login from './Login';
import Logout from './Logout';
import { login, logoutUser } from '../actions/Auth_Actions';
import { Link } from 'react-router';

export default class Navbar extends Component {
  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props;

    // Will display the Login component if the user is not authenticated, Logout otherwise
    return (
      <div className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse" aria-expanded="false">
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a href="/" className="navbar-brand">Comparable</a>
          </div>
          <div className="collapse navbar-collapse" id="navBar">
            <ul className="nav navbar-nav navbar-right">
              <li className="active">
                <Link to="/offers" id="offer-btn">Offers
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li>
                <Link to="/profile" id="login-btn">Profile
                  <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li>
                {!isAuthenticated &&
                  <Login
                    errorMessage={errorMessage}
                    onLoginClick={() => dispatch(login())}
                  />
                }

                {isAuthenticated &&
                  <Logout onLogoutClick={() => dispatch(logoutUser())} />
                }
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};
