process.env.NODE_ENV = 'production';

const path = require('path');
const commander = require('commander');

const express = require('express');
const initServer = require('../server');

const app = express();
const projectHome = path.resolve(path.join(__dirname, '..'));
const packageInfo = require('../package.json');

commander
  .version(packageInfo.version)
  .option('-p, --port <port>', 'port')
  .allowUnknownOption(true)
  .parse(process.argv)
  ;


app.set('x-powered-by', false);

app.use('/public', express.static(path.join(projectHome, 'public')));

initServer(app);

const PORT = commander.port || 3000;
app.listen(PORT, '0.0.0.0');
