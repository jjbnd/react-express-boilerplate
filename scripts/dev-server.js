const path = require('path');

const express = require('express');
const debugModule = require('debug');
const commander = require('commander');
const config = require('config');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const packageInfo = require('../package.json');
const initServer = require('../server');

const webpackDevConfig = config.get('webpack');

const app = express();
const debug = debugModule(config.has('App.title') ? config.get('App.title') : 'app');
const projectHome = path.resolve(path.join(__dirname, '..'));
const publicPath = webpackDevConfig.output.publicPath;

app.set('x-powered-by', false);

// babel transcompile for client side
const compiler = webpack(webpackDevConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath,
  noInfo: true,
}));
app.use(webpackHotMiddleware(compiler));

app.use('/public', express.static(path.join(projectHome, 'public')));

initServer(app);

commander
  .version(packageInfo.version)
  .option('-p, --port <port>', 'port')
  .allowUnknownOption(true)
  .parse(process.argv)
  ;

const PORT = commander.port || 3000;
app.listen(PORT, () => {
  debug(`http://localhost:${PORT} is started.`);
});
