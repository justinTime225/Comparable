import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getOffer } from '../actions/Profile_Offer';
import { getSkills } from '../actions/Skills_Actions';
import { sendJob } from '../actions/Job_Matches';
import OfferSlider from '../components/OfferSlider';
import BubbleChart from '../components/bubbleChart';
import ScatterPlot from '../components/scatter-plot';
const styles = {
  width: 1000,
  height: 900,
  padding: 30,
};

// Styles for Modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

class Profile extends Component {
  componentWillMount() {
    const { getOffers } = this.props;
    const email = JSON.parse(localStorage.getItem('profile')).email;
    getOffers(email);

  }

  render() {
    let profileData = this.props.profileOffer.data;

    return (
      <div className="container">
        <h1 className="offersHeading">My Offers</h1>
      {profileData &&
          <OfferSlider
          profileData={profileData}
          sendJob={this.props.sendJob}
          getSkills={this.props.getSkills}>
          </OfferSlider>
      }
        <div className="row">
          <div className="col-md-12">
            <div className="panel-heading">
            </div>
            <div className="panel panel-default">
              <div className="panel-body" >
                <h1 className="offersHeading">Related Skills</h1>
                <BubbleChart skill={this.props.skill}/>
              </div>
            </div>
          </div>
        </div>
        <ScatterPlot {...this.props} {...styles}  />
        <h4 id="equity">Equity</h4>
        <h4 id="salary">Salary</h4>
      </div>
    );
  }

}

function mapStateToProps(state) {

  const { skill, profileOffer, job } = state;
  return {
    skill,
    profileOffer,
    job
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
    sendJob: (title, data) => {
      dispatch(sendJob(title, data));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
