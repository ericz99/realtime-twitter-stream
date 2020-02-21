import React, { useState, useContext, useEffect, useRef } from 'react';

import InputField from '../InputField';
import MainContext from '../../context/MainContext';
import { fetchAllAccount, addAccount } from '../../context/actions';
import TagList from './TagList';
import ResultBox from './ResultBox';

import './styles.css';

export default function TagInput() {
  const [account, setAccount] = useState(null);
  const inputRef = useRef(null);
  const { store, dispatch } = useContext(MainContext);

  useEffect(() => {
    const input = inputRef.current;
    // # disabled input form
    if (store.isLoading) {
      input.setAttribute('disabled', true);
    }

    const fetchData = async () => {
      dispatch(await fetchAllAccount());
    };

    fetchData();
  }, [inputRef]);

  if (!store.isLoading) {
    const input = inputRef.current;
    input.removeAttribute('disabled');
  }

  // # add tag
  const addTag = async e => {
    e.persist();
    dispatch(await addAccount({ accountName: e.target.value }));
    e.target.value = '';
    setAccount(null);
  };

  // # handle keyup
  const handleKeyUp = async e => {
    if (e.key === 'Enter') {
      // # add tag
      addTag(e);
    }
  };

  // # handle change
  const handleChange = e => setAccount(e.target.value);

  return (
    <div className="tags-input">
      <TagList accounts={store.accounts} />
      <InputField
        type="text"
        className="accountInput"
        placeholder="Enter Twitter Account"
        name="account"
        onKeyUp={handleKeyUp}
        onChange={handleChange}
        ref={inputRef}
      />
      <ResultBox query={account} />
    </div>
  );
}
