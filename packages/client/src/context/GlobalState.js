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

const socket = io('http://localhost:8080');

const initialState = {
  accounts: [],
  tweets: [],
  error: {},
  isLoading: true
};

export const startStream = options => {
  console.log('starting stream');
  // # start stream
  socket.emit(SYNC_CONFIG, options);
};

export const stopStream = options => {
  console.log('stopping stream');
  // # start stream
  socket.emit(STOP_STREAMING, options);
};

export default function GlobalState({ children, ...props }) {
  const [store, dispatch] = useReducer(MainReducer, initialState);

  const initStream = () => {
    // # listen to client
    socket.on('connect', () => {
      console.log('client connected!');
    });

    // # listen for new tweet
    socket.on(NEW_TWEET, tweet => {
      dispatch({
        type: NEW_TWEET,
        payload: tweet
      });
    });
  };

  const data = { store, dispatch, initStream };

  return (
    <MainContext.Provider value={data} {...props}>
      {children}
    </MainContext.Provider>
  );
}
