import { NEW_TWEET, START_STREAMING, STOP_STREAMING } from '../constants';
import { Tweet, Account } from '../db';

/**
 *
 * @param {*} stream - Stream Object
 * @param {*} io - SocketIO Object
 */
export const startEarly = (stream, io) => {
  // # check for connection
  stream.on('connected', res => {
    console.log('Stream API connected!');
  });

  // # check for new tweets
  stream.on('tweet', async tweet => {
    const newTweet = await Tweet.findOne({ tweetID: tweet.id_str });
    // # check for new tweets
    if (!newTweet) {
      // # see which user tweeted that
      const user = await Account.findOne({ accountID: tweet.user.id_str });
      // # save new tweet
      await Tweet.create({ tweetID: tweet.id_str, tweet: tweet.text, from: user });
      // # send new tweets to client
      io.emit(NEW_TWEET, tweet);
    }
  });
};

/**
 *
 * @param {*} stream - Stream Object
 * @param {*} io - SocketIO Object
 */
export const stopStream = (stream, io) => {
  // # stop streaming
  stream.stop();
  io.emit(STOP_STREAMING);
};

/**
 *
 * @param {*} stream - Stream Object
 * @param {*} io - SocketIO Object
 */
export const startStream = (stream, io) => {
  // # stop streaming
  stream.start();
  io.emit(START_STREAMING);
};
