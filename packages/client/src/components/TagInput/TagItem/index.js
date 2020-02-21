import React, { useContext } from 'react';

export default function TagItem({ accountName, removeTag, ...props }) {
  return (
    <li className="tag" {...props}>
      <span className="tag-title">{accountName}</span>
      <span className="tag-close-icon" onClick={removeTag}>
        x
      </span>
    </li>
  );
}
