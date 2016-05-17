const angelListController = require('./controllers/angellist-controller');
const offerController = require('./controllers/offer-controller');

// handle errors and send response
const sendResponse = (res, err, data, status) => {
  if (err) {
    res.status(400).send(err);
  } else {
    res.status(status).send(data);
  }
};

module.exports = (app) => {
  app.route('/api/jobs')
    .get((req, res) => {
      angelListController.filterAngelListData(req.query, (err, data) => {
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
    .get((req, res) => {
      offerController.getOffers(req, (err, data) => {
        sendResponse(res, err, data, 200);
      });
    })
    .post((req, res) => {
      offerController.createOffer(req, (err, data) => {
        sendResponse(res, err, data, 302);
      });
    });

  app.route('/api/users/offers')
    .get((req, res) => {
      offerController.getUsersOffers(req.query, (err, data) => {
        sendResponse(res, err, data, 200);
      });
    });
};
