import { NEW_TWEET, START_STREAMING, STOP_STREAMING } from '../constants';
import { Tweet, Account } from '../db';

/**
 *
 * @param {*} stream - Stream Object
 * @param {*} io - SocketIO Object
 */
export const startEarly = (stream, io) => {
  // Stream Connect Event
  stream.on('connect', request => {
    console.log('Attempting to Connect to Twitter API');
  });

  // # check for connection
  stream.on('connected', res => {
    console.log('Stream API connected!');
  });

  // # check for new tweets
  stream.on('tweet', async tweet => {
    const newTweet = await Tweet.findOne({ tweetID: tweet.id_str });
    // # see which user tweeted that
    const user = await Account.findOne({ accountID: tweet.user.id_str });
    // # check for new tweets
    if (!newTweet && user) {
      // # save new tweet
      await Tweet.create({
        tweetID: tweet.id_str,
        tweet: tweet.text,
        from: user
      });

      // # send new tweets to client
      io.emit(NEW_TWEET, tweet);
    }
  });

  // Stream Warning Event
  stream.on('warning', warning => {
    console.log(warning);
  });
};

/**
 *
 * @param {*} stream - Stream Object
 */
export const stopStream = stream => {
  console.log('stopped');
  // # stop streaming
  stream.stop();
};

/**
 *
 * @param {*} stream - Stream Object
 */
export const startStream = stream => {
  console.log('started');
  // # stop streaming
  stream.start();
};
