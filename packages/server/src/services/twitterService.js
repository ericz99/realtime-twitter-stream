import { Account, Tweet } from '../db';
import { fetchUserData } from '../utils/twitter';
import ErrorHandler from '../error';

export const fetchAllAccount = async () => {
  return await Account.find()
    .populate('from')
    .exec();
};

/**
 *
 * @param {*} data - User account object
 */
export const addAccount = async data => {
  const account = await Account.findOne({ accountName: data.accountName });
  if (!account) {
    // # fetch user data
    const user = await fetchUserData(data.accountName);
    // # save new account
    if (user) {
      return await Account.create({ accountID: user.id_str, accountName: user.screen_name });
    }
  }

  // # throw the error
  throw new ErrorHandler(400, 'Account already existed!');
};

/**
 *
 * @param {*} data - User account object
 */
export const removeAccount = async id => {
  const account = await Account.findOne({ accountID: id });
  if (!account) {
    // # throw the error
    throw new ErrorHandler(400, "Account doesn't exist!");
  }

  // # remove account
  return await Account.deleteOne({ accountID: id });
};

export const clearAccount = async () => {
  // # drop collection
  return await Account.collection.drop();
};

export const clearAllTweets = async () => {
  // # drop collection
  return await Tweet.collection.drop();
};
