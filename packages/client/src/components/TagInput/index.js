import React, { useState, useContext, useEffect, useRef } from 'react';

import InputField from '../InputField';
import MainContext from '../../context/MainContext';
import TagList from './TagList';

import './styles.css';

export default function TagInput() {
  const [account, setAccount] = useState(null);
  const inputRef = useRef(null);
  const { accounts, fetchAllAccount, addAccount, removeAccount, isLoading } = useContext(
    MainContext
  );

  useEffect(() => {
    const input = inputRef.current;
    // # disabled input form
    if (isLoading) {
      input.setAttribute('disabled', true);
    }

    const fetchData = async () => {
      await fetchAllAccount();
    };

    fetchData();
  }, [inputRef]);

  if (!isLoading) {
    const input = inputRef.current;
    input.removeAttribute('disabled');
  }

  // # handle on change
  const handleOnChange = e => setAccount(e.target.value);

  // # add tag
  const addTag = async e => {
    e.persist();
    await addAccount({ accountName: e.target.value });
    e.target.value = '';
  };

  // # handle keyup
  const handleKeyUp = e => {
    if (e.key === 'Enter') {
      // # add tag
      addTag(e);
    }
  };

  return (
    <div className="tags-input">
      <TagList accounts={accounts} removeTag={removeAccount} />
      <InputField
        type="text"
        className="accountInput"
        placeholder="Enter Twitter Account"
        name="account"
        onKeyUp={handleKeyUp}
        onChange={handleOnChange}
        ref={inputRef}
      />
    </div>
  );
}
