import React, { Component, PropTypes } from 'react';

export default class Login extends Component {
  render() {
    const { errorMessage } = this.props;

    // Render the Login component on the page
    return (
      <a className="login-btn" onClick={(e) => this.handleClick(e)}>
        Login
      </a>
    );
  }

  // Handle login click events
  handleClick(e) {
    this.props.onLoginClick();
  }
};

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};
