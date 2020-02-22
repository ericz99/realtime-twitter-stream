import React, { useReducer } from 'react';

import MainContext from './MainContext';
import MainReducer from './reducers';

const initialState = {
  accounts: [],
  tweets: [],
  error: {},
  isLoading: true
};

export default function GlobalState({ children, ...props }) {
  const [store, dispatch] = useReducer(MainReducer, initialState);

  const data = {
    store,
    dispatch
  };

  return (
    <MainContext.Provider value={data} {...props}>
      {children}
    </MainContext.Provider>
  );
}
