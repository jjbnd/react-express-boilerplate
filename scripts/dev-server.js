import path from 'path';

import express from 'express';
import debugModule from 'debug';
import commander from 'commander';
import config from 'config';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import packageInfo from '../package.json';

import initServer from '../server';

const webpackDevConfig = config.get('webpack');

const app = express();
const debug = debugModule('file-browser:');
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

const PORT = commander.port;
app.listen(PORT, () => {
  debug(`http://localhost:${PORT} is started.`);
});
