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
      console.log(offer._id);
      return (
        <li key={offer._id}>
          <h2>{offer.title}</h2>
          <p>{offer.location}</p>
          <p>{offer.salary}</p>
          <p>{offer.equity}</p>
        </li>
      )
    })
    return (
      <ul>{offerItems}</ul>
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