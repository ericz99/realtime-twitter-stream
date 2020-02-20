import {
  NEW_TWEET,
  SYNC_CONFIG,
  ADDED_ACCOUNT,
  REMOVED_ACCOUNT,
  FETCH_ACCOUNTS,
  GET_ERRORS,
  CLEAR_ERRORS,
  IS_LOADING
} from './types';

export default function(state, action) {
  switch (action.type) {
    case ADDED_ACCOUNT:
      return {
        ...state,
        accounts: [...state.accounts, action.payload]
      };
    case REMOVED_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter((_, index) => index !== action.payload)
      };
    case FETCH_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload,
        isLoading: false
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case NEW_TWEET:
      return {
        ...state,
        tweets: [...state.tweets, action.payload]
      };
    default:
      return state;
  }
}
