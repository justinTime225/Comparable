var Offer = require('./mongo');

module.exports = {
  getOffers: function(req, res) {
    console.log('in getOffer');
    Offer.find().then(function(data) {
      if (data)  {
        res.status(200).send(data);
      } else {
        res.status(200).send('cannot find data');
      }
    });
  },
  createOffer: function(req, res) {
    console.log(req.body);
    var offer = new Offer(req.body);
    offer.save().then(function(data) {
      if (data) {
        console.log('success post');
        res.status(302).send(data);
      } else {
        res.status(302).send('error occured')
      }
    });
  }
}