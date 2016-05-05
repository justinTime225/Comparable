import React, { Component } from 'react';

export default class Home extends Component {
  render() {

    return (
      <div className="container" id="home">
        <div className="row section1 vertical-center">
          <div className="col-md-10 col-md-offset-1">
            <div className="jumbotron">
              <h1>Comparable</h1>

              <p>See how your offer stacks up today!</p>

              <p><a className="btn btn-primary btn-lg">Learn more</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
