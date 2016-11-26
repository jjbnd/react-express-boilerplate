import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';
import debugModule from 'debug';
import commander from 'commander';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import packageInfo from '../package.json';
import webpackDevConfig from './config/webpack.dev.config';

import loadRouters from './utils/auto-load-routers';

const app = express();
const debug = debugModule('file-browser:');
const projectHome = path.resolve(path.join(__dirname, '..'));
const publicPath = webpackDevConfig.output.publicPath;

app.set('x-powered-by', false);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// babel transcompile for client side
const compiler = webpack(webpackDevConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath,
  noInfo: true,
}));
app.use(webpackHotMiddleware(compiler));

app.use('/public', express.static(path.join(projectHome, 'client', 'public')));

const routers = loadRouters(path.join(projectHome, 'server', 'routers'));
routers.forEach((router) => {
  app.use('/api', router);
});

app.use('/', (req, res) => {
  res.sendFile(path.join(projectHome, 'client', 'index.html'));
});

commander
  .version(packageInfo.version)
  .option('-p, --port <port>', 'port')
  .allowUnknownOption(true)
  .parse(process.argv)
  ;

const PORT = commander.port;
app.listen(PORT, () => {
  debug(`http://localhost:${PORT} is started.`);
});
