import React from 'react';

export default React.createContext({
  accounts: [],
  tweets: [],
  error: {},
  isLoading: true,
  addAccount: data => {},
  removeAccount: (accountID, pos) => {},
  fetchAllAccount: () => {},
  queryAccount: query => {},
  initStream: () => {}
});
