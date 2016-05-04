import React, { Component } from 'react';

export default class OfferDisplay extends Component {
  render() {
    const { offer } = this.props.data;

    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1">
          {offer && 
            <ul className="displayList">
              <li className="text-center offerTitle">{offer.title}</li>
              <li className="text-center">Location: {offer.location} | Salary: {offer.salary} | Equity: {offer.equity}</li>
            </ul>}
        </div>
      </div>
    )
  }
};