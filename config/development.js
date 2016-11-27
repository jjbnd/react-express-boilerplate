const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const projectHome = path.resolve(path.join(__dirname, '..'));
const viewEntryPoint = path.join(projectHome, 'views');

module.exports.webpack = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './views/index.jsx',
  ],
  output: {
    path: path.join(projectHome, 'public', 'dist'),
    filename: 'bundle.js',
    publicPath: '/public/dist',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        },
        exclude: /node_modules/,
        include: viewEntryPoint,
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
