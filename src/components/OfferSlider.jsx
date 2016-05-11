import React, { Component } from 'react';
import Slider from 'react-slick';

export default class OfferSlider extends Component {
  render() {
    const { profileData } = this.props;

    let offerCards = profileData.map((offer) => {
      return (
        <div className="offerCard">
          <ul>
            <li>{offer.title}</li>
            <li>{offer.salary}</li>
            <li>{offer.equity}</li>
          </ul>
        </div>
      );
    });

    let sliderOptions = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1
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
