import express from './express';
import socket from './socket';
import { createConnection } from '../db';

export default async (app, server) => {
  // # start up database
  await createConnection();
  // # load app
  await express(app);
  // # load socket
  await socket(server);
};
