const path = require('path');
const fs = require('fs');

const dynamicRequire = require;

function loadRouters(absPath) {
  const files = fs.readdirSync(absPath);
  let routers = [];
  files.forEach((file) => {
    const filePath = path.join(absPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile()) {
      let router = dynamicRequire(filePath);
      if (router && ('__esModule' in router)) {
        // if es6 module
        router = router.default;
      }
      routers.push(router);
    } else if (stat.isDirectory()) {
      routers = routers.concat(loadRouters(filePath));
    }
  });

  return routers;
}

module.exports = (rootPath) => {
  const rootStats = fs.statSync(rootPath);
  if (rootStats.isFile()) {
    throw new Error('you must pass directory');
  }
  return loadRouters(rootPath);
};
