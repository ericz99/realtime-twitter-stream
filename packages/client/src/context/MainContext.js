import React from 'react';

export default React.createContext({
  accounts: [],
  tweets: [],
  error: {},
  isLoading: true,
  startStream: () => {},
  stopStream: () => {},
  addAccount: data => {},
  removeAccount: (accountID, pos) => {},
  fetchAllAccount: () => {}
});
