/* React imports */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import axios from 'axios';

/* Components */
import OfferSlider from '../components/OfferSlider';
import BubbleChart from '../components/bubbleChart';
import PieGraph from '../components/PieChart';
import Scatter from '../components/scatter';

/* Action creators */
import { togglePie, toggleBubble, toggleScatter } from '../actions/Profile_Actions';
import { getSkills } from '../actions/Skills_Actions';
import { getOffer } from '../actions/Profile_Offer';
import { sendJob } from '../actions/Job_Matches';

class Profile extends Component {
  skills: false;

  componentWillMount() {
    const { getOffers, sendJob } = this.props;
    const email = JSON.parse(localStorage.getItem('profile')).email;
    getOffers(email);
  }

  render() {
    const { getSkills, pieChart, bubbleChart, scatterChart } = this.props;

    // Grab the current displayed chart type
    const { profileChart } = this.props.profileInfo;

    let profileData = this.props.profileOffer.data;

    if (profileData && !this.skills) {
      this.skills = true;
      getSkills(profileData[0] || '');
    }
    
    return (
      <div className="container">
        <div className="row">
          {profileData && profileData.length > 0 &&
            <div>
              <h1 className="offersHeading">My Offers</h1>
              <OfferSlider
                profileData={profileData}
                sendJob={this.props.sendJob}
                getSkills={this.props.getSkills}>
              </OfferSlider>
            </div> ||
            <div>
              <Link to="/offers" className="add-offers">
                <h1 className="offersHeading">Click To Add An Offer!</h1>
              </Link>
            </div>
          }
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="panel-heading">
              {profileChart === 'scatter' &&
                <h1 className="offersHeading">Jobs</h1> ||
              <h1 className="offersHeading">Related Skills</h1>}
            </div>
            <div className="panel panel-default">
              <div className="panel-body">
                <div className="btn-group toggle-btn active" role="group" aria-label="...">
                  <button onClick={bubbleChart} type="button" className="btn btn-default">Bubbles</button>
                  <button onClick={pieChart} type="button" className="btn btn-default">Pie</button>
                  <button onClick={scatterChart} type="button" className="btn btn-default">Scatter</button>
                </div>
                {profileChart === 'bubble' &&
                  <BubbleChart skill={this.props.skill}/>
                }
                {profileChart === 'pie' &&
                  <PieGraph skill={this.props.skill}></PieGraph>
                }
                {profileChart === 'scatter' &&
                  <Scatter job={this.props.job} />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { skill, profileOffer, job, profileInfo } = state;

  return {
    skill,
    profileOffer,
    job,
    profileInfo
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOffers: (email) => {
      dispatch(getOffer(email));
    },
    getSkills: (data) => {
      dispatch(getSkills(data));
    },
    sendJob: (data) => {
      dispatch(sendJob(data));
    },
    pieChart: () => {
      dispatch(togglePie());
    },
    bubbleChart: () => {
      dispatch(toggleBubble());
    },
    scatterChart: () => {
      dispatch(toggleScatter());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
