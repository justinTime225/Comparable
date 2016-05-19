/* React imports */
import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Action creators */
import { login } from '../actions/Auth_Actions';

class Home extends Component {

  render() {
    const { login } = this.props;

    return (
      <div className="container-fluid" id="home">
        <div className="row hero-section vertical-center">
          <div className="col-md-6 col-md-offset-3">
            <h1>Comparable</h1>
            <br></br>
            <h4>See how your job offer stacks up...</h4>
            <h4>With the most powerful job comparison tool on the market!</h4>
            <br></br>
            <div className="btn btn-primary btn-lg" onClick={this.props.isAuthenticated ? () => { window.location.hash = '#/offers'; } : () => { login(); }}><span>Get Started</span></div>
          </div>
        </div>
        <div className="row mid-section vertical-center">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <h4>Visualize the comparison data with one of our many charts & graphs...</h4>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 col-md-offset-2">
                <img alt="Main Offer Page &amp; BarChart" src="https://s3.amazonaws.com/comparable/OfferMainChart.png" className="img-responsive img-thumbnail" />
              </div>
              <div className="col-md-4">
                <img alt="Profile Page &amp; and Skills Bubble Graph" src="https://s3.amazonaws.com/comparable/ProfileCharts.png" className="img-responsive img-thumbnail" />
              </div>
            </div>
          </div>
        </div>
        <div className="row lower-section vertical-center">
          <div className="col-md-4 col-md-offset-4">
            <h4>Comparable's mission it to provide all prospective job seekers with the data needed to assess and leverage their current offers against similar in the market.</h4>
            <br></br>
            <div className="btn btn-primary btn-lg" onClick={this.props.isAuthenticated ? () => { window.location.hash = '#/offers'; } : () => { login(); }}>Learn More</div>
          </div>
        </div>
        <div className="row mid-section mid-section-3 vertical-center">
          <div className="col-md-12">
            <div className="row vertical-center logo-center">
              <div className="col-lg-2 col-md-2 col-sm-2">
                <img className="img-responsive" src="https://camo.githubusercontent.com/722a5cc12c7d40231ebeb8ca6facdc8547e2abf7/68747470733a2f2f64336a732e6f72672f6c6f676f2e737667" alt="D3" />
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2">
                <img className="img-responsive" src="http://www.learningxpert.com/sites/default/files/styles/large/public/expressjs_logo.png?itok=JC-5xZoe" alt="Express" />
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2">
                <img className="img-responsive" src="https://upload.wikimedia.org/wikipedia/en/thumb/4/45/MongoDB-Logo.svg/527px-MongoDB-Logo.svg.png" alt="MongoDB" />
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2">
                <img className="img-responsive" src="https://pixabay.com/static/uploads/photo/2015/04/23/17/41/node-js-736399_960_720.png" alt="Node" />
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2">
                <img className="img-responsive" src="http://yycjs.com/real-world-react/img/react-logo.png" alt="React" />
              </div>
              <div className="col-lg-2 col-md-2 col-sm-2">
                <img className="img-responsive" src="https://camo.githubusercontent.com/f28b5bc7822f1b7bb28a96d8d09e7d79169248fc/687474703a2f2f692e696d6775722e636f6d2f4a65567164514d2e706e67" alt="Redux" />
              </div>
            </div>
          </div>
        </div>
        <div className="row lower-section vertical-center">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6 col-md-offset-3">
                <h4>Built for techies by techies...</h4>
              </div>
            </div>
            <div className="row vertical-center logo-center">
              <div className="col-lg-4">
                <img className="headshot img-responsive img-thumbnail" src="https://avatars0.githubusercontent.com/u/16548102?v=3&s=460" alt="Justin Nguyen" />
              </div>
              <div className="col-lg-4">
                <img className="headshot img-responsive img-thumbnail" src="https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/7/005/03d/316/0540c0c.jpg" alt="Ryan Haase" />
              </div>
              <div className="col-lg-4">
                <img className="headshot img-responsive img-thumbnail" src="https://avatars0.githubusercontent.com/u/9014795?v=3&s=460" alt="Trevor Pace" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
  const { isAuthenticated } = auth;

  return {
    isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: () => {
      dispatch(login());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
