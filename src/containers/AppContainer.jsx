/* React imports */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Components */
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
        <footer className="footer">
          <div className="container">
            <p>Made with <i className="fa fa-bicycle" ></i> &amp; <i className="fa fa-beer" aria-hidden="true"></i> by
              <a href="https://github.com/justinTime225" target="_blank"> Justin</a> &amp;
              <a href="https://github.com/ryandhaase" target="_blank"> Ryan</a> &amp;
              <a href="https://github.com/tmpace" target="_blank"> Trevor</a>
            </p>
          </div>
        </footer>
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
