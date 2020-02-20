import React from 'react';

import TagItem from '../TagItem';

export default function TagList({ accounts, removeTag }) {
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
