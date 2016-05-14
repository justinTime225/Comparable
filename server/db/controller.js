var Offer = require('./mongo');
const toTitleCase = require('../utils/helpers');

module.exports = {
  getOffers: function(req, res) {
    Offer.find({userEmail: req.query.userEmail}).then(function(data) {
      if (data)  {
        res.status(200).send(data);
      } else {
        res.status(200).send('cannot find data');
      }
    });
  },
  createOffer: function(req, res) {
    req.body.title = toTitleCase(req.body.title);
    req.body.location = toTitleCase(req.body.location);

    var offer = new Offer(req.body);
    offer.save().then(function(data) {
      if (data) {
        res.status(302).send(data);
      } else {
        res.status(302).send('error occured')
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
