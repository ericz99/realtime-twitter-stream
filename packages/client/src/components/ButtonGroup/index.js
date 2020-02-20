import React, { forwardRef } from 'react';

import './styles.css';

const ButtonGroup = forwardRef(({ children }, ref) => {
  return (
    <div className="button-groups" ref={ref}>
      {children}
    </div>
  );
});

export default ButtonGroup;
