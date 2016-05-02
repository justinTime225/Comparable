import React, { Component, PropTypes } from 'react';

export default class Login extends Component {
  render() {
    const { errorMessage } = this.props;

    return (
      <div className="pull-right">
        <button onClick={(e) => this.handleClick(e)} className="btn btn-primary">
          Login
        </button>

        {errorMessage &&
          <p style={{color:'red'}}>{errorMessage}</p>
        }
      </div>
    )
  }

  handleClick(e) {
    this.props.onLoginClick();
  }
};

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}