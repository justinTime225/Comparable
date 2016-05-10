var Offer = require('./mongo');

module.exports = {
  getOffers: function(req, res) {
    console.log('in getOffer');
    Offer.find(function(err, data) {
      if (err)  {
        res.status(200).send('cannot find data');
      } else {
        res.status(200).send(data);
      }
    })
  },
  createOffer: function(req, res) {
    console.log('in createOffer');
    var offer = new Offer(req.body);
    offer.save(function(err, data) {
      if (err) {
        res.status(302).send('error occured')
      } else {
        console.log('success');
        res.status(302).send(data);
      }
    })
    // res.status(302).send(req.body);
  }
}