const Offer = require('../models/offer-model');
const toTitleCase = require('../utils/helpers');

module.exports = {
  getOffers: (req, callback) => {
    Offer.find({ userEmail: req.query.userEmail }).then((data) => {
      if (data) {
        callback(null, data);
      } else {
        callback('cannot find data', data);
      }
    });
  },

  createOffer: (req, callback) => {
    const userOffer = req.body;

    userOffer.title = toTitleCase(userOffer.title);
    userOffer.location = toTitleCase(userOffer.location);

    const offer = new Offer(userOffer);

    offer.save().then((data) => {
      if (data) {
        callback(null, data);
      } else {
        callback('error occured', data);
      }
    });
  },

  getUsersOffers: (params, callback) => {
    Offer.find({ title: params.title }, 'title equity salary location').then(
      (data) => {
        if (data) {
          callback(null, data);
        } else {
          callback('error', data);
        }
      }
    );
  },
};
