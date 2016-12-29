const path = require('path');
const bodyParser = require('body-parser');
const loadRouters = require('./utils/auto-load-routers');
const fs = require('fs');

const indexHtmlPath = path.join(__dirname, '..', 'public', 'index.html');
const index = fs.readFileSync(indexHtmlPath);

function initServer(app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.end(index);
  });

  const routers = loadRouters(path.join(__dirname, 'routers'));
  routers.forEach((router) => {
    app.use('/api', router);
  });
}

module.exports = initServer;
