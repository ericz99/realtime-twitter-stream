import React from 'react';

import './styles.css';

export default function Log({ value, ...props }) {
  return <textarea className="log-area" value={value} {...props} />;
}
