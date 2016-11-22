import express from 'express';
import debugModule from 'debug';

const debug = debugModule('file-browser:hello');
const router = express.Router();

router.get('/hello', (req, res) => {
  debug('/hello');
  res.send('hello');
});

export default router;
