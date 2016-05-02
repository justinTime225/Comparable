import React, { Component } from 'react';
import {connect} from 'react-redux';
import { loginUser } from '../actions/Auth_Actions';
import Login from '../components/Login';
import Navbar from '../components/Navbar';
import { Link } from 'react-router';

class Test extends Component {
  render() {
    console.log(this.props);
    const { dispatch, isAuthenticated, errorMessage } = this.props;

    return (
      <div>
        <Navbar 
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
          dispatch={dispatch}
        />
        <Link to="/test">Link to test</Link>
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
    errorMessage
  }
};

export default connect(mapStateToProps)(Test)
