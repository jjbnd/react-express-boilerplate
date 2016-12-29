process.env.NODE_ENV = 'production';

const config = require('config');
const webpack = require('webpack');

const webpackPrdConfig = config.get('webpack');

const compiler = webpack(webpackPrdConfig);
compiler.run((err) => {
  if (err) {
    console.log(err.messgae);
  }
});
