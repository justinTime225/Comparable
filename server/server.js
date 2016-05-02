const path = require('path');
const express = require('express');
const angelListController = require('./angelList/angel_list_controller');

// handle errors and send response
const sendResponse = function (res, err, data, status) {
  if (err) {
    res.status(400).send('Error');
  } else {
    res.status(status).send(data);
  }
};

module.exports = {
  app: function () {
    const app = express();
    const indexPath = path.join(__dirname, '/../index.html');
    const publicPath = express.static(path.join(__dirname, '../public'));

    app.use('/public', publicPath);
    app.get('/', function (_, res) {
      res.sendFile(indexPath);
    });

    // routes TODO: move to routes.js
    app.route('/api/jobs')
      .get((req, res) => {
        // route for getting jobs from angelList data
        angelListController.filterAngelListData(req.query.title, (err, data) => {
          sendResponse(res, err, data, 200);
        });
      });

    return app;
  },
};
