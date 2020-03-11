import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

// # import config
import { api } from '../config';

// # import api routes
import mainApi from '../api';

export default app => {
  app.enable('trust proxy');
  app.use(cors());
  app.use(helmet());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  /** LOAD API */
  app.use(api.prefix, mainApi);

  // # if production
  if (process.env.NODE_ENV !== 'development') {
    // # set static path
    app.use(express.static(path.join(__dirname, '..', '..', '..', '/client', '/build')));
    // # get html from dist
    app.get('*', (req, res, next) => {
      return res.sendFile(
        path.join(__dirname, '..', '..', '..', '/client', '/build', 'index.html')
      );
    });
  }

  /** INVALID ROUTE HANDLER */
  app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = 'Not Found!';
    return res.status(err.status).json({
      status: err.status,
      path: req.originalUrl,
      message: err.message
    });
  });

  /** CATCH ANY ERROR */
  app.use((err, req, res, next) => {
    if (err) {
      err.status = err.status || 500;
      return res.status(err.status).json({
        status: err.status,
        path: req.originalUrl,
        message: err.message
      });
    }

    return next();
  });
};
