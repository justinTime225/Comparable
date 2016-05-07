import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';

class App extends Component {
  render() {
    // Destructure object to create variables for these props
    const { dispatch, isAuthenticated, errorMessage } = this.props;

    // Render this html on every page
    return (
      <div>
        <Navbar
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
          dispatch={dispatch}
        />
        {this.props.children}
      </div>
    );
  }
}

// We will use this function to connect to state
function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated, errorMessage } = auth;

  return {
    isAuthenticated,
    errorMessage,
  };
}

// Connect this component to our state
export default connect(mapStateToProps)(App);
