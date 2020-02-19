import { Router } from 'express';

// # import services
import {
  addAccount,
  removeAccount,
  clearAccount,
  clearAllTweets,
  fetchAllAccount
} from '../../services';

const route = Router();

export default app => {
  app.use('/twitter', route);

  /** TEST ROUTE */
  route.get('/test', (req, res, next) => {
    return res.send('ok');
  });

  /** FETCH ALL ACCOUNTS */
  route.get('/account/all', async (req, res, next) => {
    try {
      const accounts = await fetchAllAccount();
      // # return user response
      return res.status(200).json({
        status: 200,
        request_url: req.originalUrl,
        data: {
          accounts
        }
      });
    } catch (e) {
      if (e) {
        return next(e);
      }
    }
  });

  /** ADD ACCOUNT ROUTE */
  route.post('/add/account', async (req, res, next) => {
    try {
      // # add new account
      await addAccount(req.body);
      // # return user response
      return res.status(200).json({
        status: 200,
        request_url: req.originalUrl,
        message: 'Successfully added account!'
      });
    } catch (e) {
      if (e) {
        return next(e);
      }
    }
  });

  /** REMOVE ACCOUNT ROUTE */
  route.delete('/remove/account/:id', async (req, res, next) => {
    const { id } = req.params;
    // # remove account
    await removeAccount(id);
    // # return user response
    return res.status(200).json({
      status: 200,
      request_url: req.originalUrl,
      message: 'Successfully removed account!'
    });
  });

  /** CLEAR ALL ACCOUNT */
  // # TODO: if account is clear, frontend should disable clear all btn
  route.post('/account/clear', async (req, res, next) => {
    // # clear account
    await clearAccount();
    // # return user response
    return res.status(200).json({
      status: 200,
      request_url: req.originalUrl,
      message: 'Successfully cleared all account!'
    });
  });

  /** CLEAR ALL TWEETS FROM DB */
  route.post('/tweets/clear', async (req, res, next) => {
    // # clear all tweets to free up db
    await clearAllTweets();
    // # return user response
    return res.status(200).json({
      status: 200,
      request_url: req.originalUrl,
      message: 'Successfully cleared all tweets!'
    });
  });
};
