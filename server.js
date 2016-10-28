var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var config = require('./webpack-dev.config');
var DashboardPlugin = require('webpack-dashboard/plugin');

webpack(config).apply(new DashboardPlugin());

new WebpackDevServer(webpack(config), {
  contentBase: 'public/',
  publicPath: '',
  inline: true,
  hot: true
 }).listen(3443, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }
  console.log('Listening at http://localhost:3443/');
});