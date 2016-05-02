import React, { Component, PropTypes } from 'react';

export default class Logout extends Component {
  render() {
    const { onLogoutClick } = this.props;

    return (
      <div className="pull-right">
        <button onClick={() => onLogoutClick()} className="btn btn-primary">
          Logout
        </button>
      </div>
    )
  }
};

Logout.propTypes = {
  onLogoutClick: PropTypes.func.isRequired
}