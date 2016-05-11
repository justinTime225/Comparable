import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getOffer } from '../actions/Profile_Offer';
import OfferSlider from '../components/OfferSlider';


class Profile extends Component {
  componentWillMount() {
    const { getOffers } = this.props;
    getOffers();
  }

  render() {
    let profileData = this.props.profile.data;

    return (
      <div>
      {profileData &&
          <OfferSlider profileData={profileData}></OfferSlider> ||
      }
      </div>
    );
  }

}

function mapStateToProps(state) {

  const { profile } = state;
  return {
    profile,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getOffers: () => {
      dispatch(getOffer());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
