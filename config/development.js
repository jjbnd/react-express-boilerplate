const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const projectHome = path.resolve(path.join(__dirname, '..'));
const viewEntryPoint = path.join(projectHome, 'views');

const appBuild = path.join(projectHome, 'public', 'dist');
const publicPath = '/';

module.exports.webpack = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './views/index.jsx',
  ],
  output: {
    path: appBuild,
    pathInfo: true,
    filename: 'public/dist/bundle.js',
    publicPath,
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: viewEntryPoint,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  postcss() {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ],
      }),
    ];
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
