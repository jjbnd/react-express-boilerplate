import path from 'path';
import bodyParser from 'body-parser';

import loadRouters from './utils/auto-load-routers';

function initServer(app) {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
  });

  const routers = loadRouters(path.join(__dirname, 'routers'));
  routers.forEach((router) => {
    app.use('/api', router);
  });
}

export default initServer;
