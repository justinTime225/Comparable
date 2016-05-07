const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const indexPath = path.join(__dirname, '../../index.html');
const publicPath = express.static(path.join(__dirname, '../public'));


module.exports = (app) => {

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use('/public', publicPath);
  app.get('/', (_, res) => {
    res.sendFile(indexPath);
  });
};
