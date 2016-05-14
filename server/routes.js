const angelListController = require('./controllers/angelListController');
const OfferController = require('./db/controller');
// handle errors and send response
const sendResponse = (res, err, data, status) => {
  if (err) {
    res.status(400).send('Error');
  } else {
    res.status(status).send(data);
  }
};

module.exports = (app) => {
  app.route('/api/jobs')
    .get((req, res) => {
      // route for getting jobs from angelList data
      angelListController.filterAngelListData(req.query, (err, data) => {
        sendResponse(res, err, data, 200);
      });
    });

  app.route('/api/offer-filters')
    .get((req, res) => {
      angelListController.getOfferFilters((err, data) => {
        sendResponse(res, err, data, 200);
      });
    });

  app.route('/api/skills')
    .get((req, res) => {
      const title = req.query.title || '';
      angelListController.getSkills(title, (err, data) => {
        sendResponse(res, err, data, 200);
      });
    });
  app.route('/api/offers')
    .get(OfferController.getOffers)
    .post(OfferController.createOffer);
};
