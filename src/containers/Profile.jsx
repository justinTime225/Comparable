import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { getOffer } from '../actions/Profile_Offer';
export default class Profile extends Component {
  componentWillMount() {
    this.props.getOffer();
  }
  render() {
    const offerItems = this.props.profile.data.map((offer) => {
      return <div key={offer.title}>{offer.title}</div>
    })
    return (
      <div>{offerItems}</div>
    );
  }

}

function mapStateToProps(state) {
  
  const { profile } = state;
  return {
    profile
  };
}

export default connect(mapStateToProps, {getOffer})(Profile);