/* React imports */
import React, { Component, PropTypes } from 'react';

export default class Logout extends Component {
  render() {
    const { onLogoutClick } = this.props;

    // Render the Logout link on the page, handles clicks as well
    return (
      <a href="/" onClick={() => onLogoutClick()}>
        Logout
      </a>
    );
  }
}

Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired,
};
