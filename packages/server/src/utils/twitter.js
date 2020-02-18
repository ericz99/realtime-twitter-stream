import Twit from 'twit';

// # import cred
import { consumerKey, consumerSecret, accessToken, accessSecret } from '../config';

// # import stream handler
import { startEarly, stopStream } from './streamHandler';

// # create twitter instance
const Twitter = new Twit({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token: accessToken,
  access_token_secret: accessSecret
});

/**
 *
 * @param {*} account - Account user name
 * @returns - Returns account object
 */
export const fetchUserData = async account => {
  try {
    const params = { screen_name: account };
    // # return data obj
    const { data } = await Twitter.get('/users/show', params);
    // # return data
    return data;
  } catch (e) {
    if (e) {
      throw new Error(e);
    }
  }
};

/**
 *
 * @param {*} io - SocketIO Server
 * @param {*} options - Options for twitter stream api
 */
export const initStream = (io, options) => {
  const stream = Twitter.stream('statuses/filter', options);
  // # start stream handler
  return startEarly(stream, io);
};

/**
 * @returns - Returns twitter objects
 */
export const streamObj = options => Twitter.stream('statuses/filter', options);
