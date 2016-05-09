import React, { Component } from 'react';

export default class OfferDisplay extends Component {
  render() {
    // Grab the offer property from the props
    const { userOffer } = this.props.data;

    // Render the job offer information on the page
    return (
      <div className="row offer-form">
        <div className="col-md-10 col-md-offset-1">
          {userOffer &&
            <ul className="displayList">
              <li className="text-center offerTitle">{userOffer.title}</li>
              <li className="text-center">
                Location: {userOffer.location} | Salary: {userOffer.salary} | Equity: {userOffer.equity}
              </li>
            </ul>}
        </div>
      </div>
    );
  }
}
