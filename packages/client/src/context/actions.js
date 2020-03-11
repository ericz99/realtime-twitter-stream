import axios from 'axios';
import {
  START_STREAMING,
  STOP_STREAMING,
  NEW_TWEET,
  SYNC_CONFIG,
  ADDED_ACCOUNT,
  GET_ERRORS,
  REMOVED_ACCOUNT,
  FETCH_ACCOUNTS,
  IS_LOADING
} from './types';

export const setLoading = () => {
  return { type: IS_LOADING };
};

export const queryAccount = async query => {
  try {
    const resp = await axios.get(`/api/twitter/account?search=${query}`);
    const { account } = resp.data.data;
    return account;
  } catch (e) {
    if (e) {
      return {
        type: GET_ERRORS,
        payload: e.response.data
      };
    }
  }
};

export const addAccount = async data => {
  try {
    // # make request
    const resp = await axios.post('api/twitter/add/account', data);
    const { account } = resp.data.data;
    // # dispatch action
    return {
      type: ADDED_ACCOUNT,
      payload: account
    };
  } catch (e) {
    if (e) {
      return {
        type: GET_ERRORS,
        payload: e.response.data
      };
    }
  }
};

export const removeAccount = async (accountID, pos) => {
  try {
    // # make request
    const resp = await axios.delete(`/api/twitter/remove/account/${accountID}`);

    // # dispatch action
    return {
      type: REMOVED_ACCOUNT,
      payload: pos
    };
  } catch (e) {
    if (e) {
      return {
        type: GET_ERRORS,
        payload: e.response.data
      };
    }
  }
};

export const fetchAllAccount = async accounts => {
  try {
    // # sim loading
    setLoading();
    // # make request
    const resp = await axios.get('/api/twitter/account/all');
    // # dispatch action
    return {
      type: FETCH_ACCOUNTS,
      payload: resp.data.data.accounts
    };
  } catch (e) {
    if (e) {
      return {
        type: GET_ERRORS,
        payload: e.response.data
      };
    }
  }
};
