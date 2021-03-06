/* React imports */
import React, { Component } from 'react';
import Slider from 'react-slick';

export default class OfferSlider extends Component {
  // Grabs the skills and the comparison job data for clicked job
  fetchSkills(profileOffer) {
    this.props.getSkills(profileOffer)
    this.props.sendJob(profileOffer);
  }

  render() {
    const { profileData } = this.props;

    let offerCards = profileData.map((offer) => {
      return (
        <div className="offerCard text-center">
          <h4 className="cardTitle">{offer.title}</h4>
          <h6 className="cardTitle">{offer.location}</h6>
          <table className="table">
            <thead>
              <tr>
                <th className="text-center">Salary</th>
                <th className="text-center">Equity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">{offer.salary / 1000}k</td>
                <td className="text-center">{offer.equity}%</td>
              </tr>
            </tbody>
          </table>
          <btn onClick={this.fetchSkills.bind(this, offer)} className="card-btn">View</btn>
        </div>
      );
    });

    let sliderOptions = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 3000,
    };

    return (
      <div className="container">
        <Slider {...sliderOptions}>
          {offerCards}
        </Slider>
      </div>
    );
  }
}
