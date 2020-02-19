import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { Button } from 'react-bootstrap';

import InputField from './components/InputField';
import TagInput from './components/TagInput';
import ButtonGroup from './components/ButtonGroup';
import Log from './components/Log';

// # import our context provider
import GlobalState from './context/GlobalState';

const controls = [
  { id: 0, variant: 'info', className: 'clearTweetBtn', value: 'Clear Tweets' },
  { id: 1, variant: 'warning', className: 'clearAccountBtn', value: 'Clear Account' },
  { id: 2, variant: 'success', className: 'startStreamBtn', value: 'Start Stream' },
  { id: 3, variant: 'danger', className: 'stopStreamBtn', value: 'Stop Stream' }
];

const App = () => {
  const [log, setLog] = useState(null);

  // # handle click
  const handleClick = e => {
    console.log(e.target);
  };

  return (
    <GlobalState>
      <div className="wrapper">
        <div className="container">
          <div className="row">
            <div className="col-sm-7">
              <TagInput />

              <ButtonGroup>
                {controls.map(control => (
                  <Button
                    variant={control.variant}
                    key={control.id}
                    className={control.className}
                    onClick={handleClick}
                    type="button"
                    block
                  >
                    {control.value}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
            <div className="col-sm-5">
              <Log value="hello world \n hello world" disabled />
            </div>
          </div>
        </div>
      </div>
    </GlobalState>
  );
};

export default hot(App);
