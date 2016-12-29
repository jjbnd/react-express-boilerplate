const express = require('express');
const debugModule = require('debug');

const debug = debugModule('example:');
const router = express.Router();

router.get('/hello', (req, res) => {
  debug('/hello');
  res.send('hello');
});

module.exports = router;
