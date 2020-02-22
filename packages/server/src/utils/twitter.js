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
    return {
      id: data.id,
      id_str: data.id_str,
      name: data.name,
      screen_name: data.screen_name,
      location: data.location,
      description: data.description,
      url: data.url,
      protected: data.protected,
      followers_count: data.followers_count,
      profile_pic: data.profile_image_url_https
    };
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
export const stopInitStream = options => {
  const stream = Twitter.stream('statuses/filter', options);
  // # stop stream
  return stopStream(stream);
};
