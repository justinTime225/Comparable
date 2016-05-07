const app = require('./server');
const port = (process.env.PORT || 8080);

if (process.env.NODE_ENV !== 'production') {
  const bodyParser = require('body-parser');
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../webpack.dev.config.js');
  const compiler = webpack(config);

  // use body parser middleware
  app.use(bodyParser.json());

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));
}

app.listen(port);
console.log('port is running on ', port);
