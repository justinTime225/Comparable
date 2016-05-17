const Offer = require('../db/mongo');
const toTitleCase = require('../utils/helpers');

module.exports = {
  getOffers: (req, res) => {
    Offer.find({ userEmail: req.query.userEmail }).then((data) => {
      if (data) {
        res.status(200).send(data);
      } else {
        res.status(200).send('cannot find data');
      }
    });
  },

  createOffer: (req, res) => {
    const userOffer = req.body;

    userOffer.title = toTitleCase(userOffer.title);
    userOffer.location = toTitleCase(userOffer.location);

    const offer = new Offer(userOffer);

    offer.save().then((data) => {
      if (data) {
        res.status(302).send(data);
      } else {
        res.status(302).send('error occured');
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
