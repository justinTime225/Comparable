const express = require('express');
const app = express();

require('./utils/middleware')(app, express);
require('./routes')(app, express);

console.log('server file');
module.exports = app;
