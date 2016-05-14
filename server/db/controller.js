var Offer = require('./mongo');

module.exports = {
  getOffers: function(req, res) {
    console.log('in getOffer');
    console.log(req.params);
    console.log(req.query.userEmail);
    Offer.find({userEmail: req.query.userEmail}).then(function(data) {
      if (data)  {
        res.status(200).send(data);
      } else {
        res.status(200).send('cannot find data');
      }
    });
  },
  createOffer: function(req, res) {
    var offer = new Offer(req.body);
    offer.save().then(function(data) {
      if (data) {
        console.log('success post');
        res.status(302).send(data);
      } else {
        res.status(302).send('error occured')
      }
    });
  },

  getUsersOffers: (params, callback) => {
    Offer.find({ title: params.title }).then(
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
