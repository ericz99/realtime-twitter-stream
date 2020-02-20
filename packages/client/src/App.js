import React, { useState, useContext, useRef, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { Button } from 'react-bootstrap';

import InputField from './components/InputField';
import TagInput from './components/TagInput';
import ButtonGroup from './components/ButtonGroup';
import Log from './components/Log';

// # import our context provider
import { startStream } from './context/GlobalState';
import MainContext from './context/MainContext';

const App = () => {
  const [streamStarted, setStreamStarted] = useState(false);
  const { initStream } = useContext(MainContext);
  const streamBtnRef = useRef(null);

  useEffect(() => {
    // # init stream
    initStream();
  }, []);

  // # handle click
  const handleClick = e => {
    // startStream();
    setStreamStarted(streamStarted => !streamStarted);
  };

  let streamButton = null;

  if (!streamStarted) {
    streamButton = (
      <Button
        variant="success"
        className="streamBtn"
        onClick={handleClick}
        type="button"
        ref={streamBtnRef}
        block
      >
        Start Stream
      </Button>
    );
  } else {
    streamButton = (
      <Button
        variant="danger"
        className="streamBtn"
        onClick={handleClick}
        type="button"
        ref={streamBtnRef}
        block
      >
        Stop Stream
      </Button>
    );
  }

  return (
    <div className="wrapper">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <TagInput />
            <ButtonGroup>{streamButton}</ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default hot(App);
