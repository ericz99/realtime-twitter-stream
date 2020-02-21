import React, { useContext } from 'react';

import MainContext from '../../../context/MainContext';
import { removeAccount } from '../../../context/actions';
import TagItem from '../TagItem';

export default function TagList({ accounts }) {
  const { store, dispatch } = useContext(MainContext);

  // # remove tag
  const removeTag = async (id, pos) => {
    dispatch(await removeAccount(id, pos));
  };

  return (
    <>
      <ul id="tags">
        {accounts.map((account, index) => (
          <TagItem
            key={Math.random()}
            accountName={account.accountName}
            removeTag={() => removeTag(account.accountID, index)}
          />
        ))}
      </ul>
    </>
  );
}
