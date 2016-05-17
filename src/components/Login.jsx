/* React imports */
import React, { Component, PropTypes } from 'react';

export default class Login extends Component {
  // Handle login click events
  handleClick() {
    this.props.onLoginClick();
  }

  render() {
    const { errorMessage } = this.props;

    // Render the Login component on the page
    return (
      <a className="login-btn" onClick={(e) => this.handleClick(e)}>
        Login
      </a>
    );
  }
}

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};
