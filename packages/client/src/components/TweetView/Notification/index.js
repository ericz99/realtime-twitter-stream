import React from 'react';

import './styles.css';

export default function Notification() {
  return (
    <div className="notification-bar">
      <p>
        There are 12 new tweets! <a href="#top">Click here to see them.</a>
      </p>
    </div>
  );
}
