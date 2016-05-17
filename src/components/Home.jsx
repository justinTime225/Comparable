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
            <h4>Built for techies by techies, Comparable's mission it to provide all prospective job seekers with the data needed to assess and leverage their current offers against similar in the market.</h4>
            <br></br>
            <div className="btn btn-primary btn-lg" onClick={this.props.isAuthenticated ? () => { window.location.hash = '#/offers'; } : () => { login(); }}>Learn More</div>
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
