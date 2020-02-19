import React, { useReducer } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import {
  START_STREAMING,
  STOP_STREAMING,
  CLEAR_ALL_ACCOUNT,
  CLEAR_ALL_TWEET,
  NEW_TWEET,
  SYNC_CONFIG,
  ADDED_ACCOUNT,
  GET_ERRORS,
  REMOVED_ACCOUNT,
  FETCH_ACCOUNTS,
  IS_LOADING
} from './types';

import MainContext from './MainContext';
import MainReducer from './reducers';

const initialState = {
  accounts: [],
  tweets: [],
  error: {},
  isLoading: true
};

export default function GlobalState({ children }) {
  const socket = io('http://localhost:8080');
  const [mainState, dispatch] = useReducer(MainReducer, initialState);

  const addAccount = async data => {
    try {
      // # make request
      const resp = await axios.post('http://localhost:8080/api/twitter/add/account', data);
      // # dispatch action
      dispatch({
        type: ADDED_ACCOUNT,
        payload: data
      });
    } catch (e) {
      if (e) {
        dispatch({
          type: GET_ERRORS,
          payload: e.response.data
        });
      }
    }
  };

  const removeAccount = async (accountID, pos) => {
    try {
      // # make request
      const resp = await axios.delete(
        `http://localhost:8080/api/twitter/remove/account/${accountID}`
      );
      // # dispatch action
      dispatch({
        type: REMOVED_ACCOUNT,
        payload: pos
      });
    } catch (e) {
      if (e) {
        dispatch({
          type: GET_ERRORS,
          payload: e.response.data
        });
      }
    }
  };

  const fetchAllAccount = async accounts => {
    try {
      // # sim loading
      dispatch({ type: IS_LOADING });
      // # make request
      const resp = await axios.get('http://localhost:8080/api/twitter/account/all');
      // # dispatch action
      dispatch({
        type: FETCH_ACCOUNTS,
        payload: resp.data.data.accounts
      });
    } catch (e) {
      if (e) {
        dispatch({
          type: GET_ERRORS,
          payload: e.response.data
        });
      }
    }
  };

  return (
    <MainContext.Provider
      value={{
        accounts: mainState.accounts,
        tweets: mainState.tweets,
        error: mainState.error,
        isLoading: mainState.isLoading,
        addAccount,
        removeAccount,
        fetchAllAccount
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
