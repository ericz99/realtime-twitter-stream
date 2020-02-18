import express from 'express';
import http from 'http';
import path from 'path';

// # import config
import { backlog, port } from './config';

(async () => {
  const app = express();
  // # create & listen to server
  const server = http
    .createServer(app)
    .listen(port, backlog, console.log(`Server is listening on port ${port}`));
  // # load our api or anything
  await require('./loaders').default(app, server);
})();
