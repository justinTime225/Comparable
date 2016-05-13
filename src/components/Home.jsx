import React, { Component } from 'react';

export default class Home extends Component {
  render() {

    return (
      <div className="container-fluid" id="home">
        <div className="row hero-section vertical-center">
          <div className="col-md-6 col-md-offset-3">
            <h1>Comparable</h1>
            <br/>
            <h5>See how your job offer stacks up...</h5>
            <h5>With the most powerful job comparison tool on the market!</h5>
            <br/>
            <p><a className="btn btn-primary btn-lg"><span>Get Started</span></a></p>
          </div>
        </div>
        <div className="row mid-section vertical-center">
          <div className="col-md-6 col-md-offset-3">
            <img alt="Offer GIF" src="https://s3.amazonaws.com/comparable/ezgif.com-gif-maker.gif" />
          </div>
        </div>
        <div className="row lower-section vertical-center">
          <div className="col-md-6 col-md-offset-3">

            <p><a className="btn btn-primary btn-lg">Learn More</a></p>
          </div>
        </div>
      </div>
    );
  }
};

// TODO: Remove verticle-align from CSS
