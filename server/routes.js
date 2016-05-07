const angelListController = require('./controllers/angelListController');

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
      angelListController.filterAngelListData(req.query.title, (err, data) => {
        sendResponse(res, err, data, 200);
      });
    });

  app.route('/api/offer-filters')
    .get((req, res) => {
      angelListController.getOfferFilters((err, data) => {
        sendResponse(res, err, data, 200);
      });
    });
};
