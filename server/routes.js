const angelListController = require('./angelList/angel_list_controller');

// handle errors and send response
const sendResponse = (res, err, data, status) => {
  console.log('server');
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
};
