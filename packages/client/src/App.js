import React, { useState, useContext, useRef, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { Button } from 'react-bootstrap';

import InputField from './components/InputField';
import TagInput from './components/TagInput';
import ButtonGroup from './components/ButtonGroup';
import Log from './components/Log';
import TweetView from './components/TweetView';

// # import our context provider
import { startStream, stopStream } from './context/GlobalState';
import MainContext from './context/MainContext';

const App = () => {
  const [streamStarted, setStreamStarted] = useState(false);
  const [userIds, setUserIds] = useState([]);
  const { initStream, accounts } = useContext(MainContext);
  const streamBtnRef = useRef(null);

  useEffect(() => {
    // # init stream
    initStream();

    if (accounts.length > 0) {
      const listOfIds = accounts.map(({ accountID }) => accountID);
      setUserIds(listOfIds);
    }
  }, [accounts]);

  // # handle start stream
  const startStreamHandler = e => {
    const options = { follow: userIds, exclude_replies: true, include_rts: false };
    // startStream(options);
    setStreamStarted(streamStarted => !streamStarted);
  };

  // # handle stop stream
  const stopStreamHandler = e => {
    const options = { follow: userIds, exclude_replies: true, include_rts: false };
    // stopStream(options);
    setStreamStarted(streamStarted => !streamStarted);
  };

  let streamButton = null;

  if (!streamStarted) {
    streamButton = (
      <Button
        variant="success"
        className="streamBtn"
        onClick={startStreamHandler}
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
        onClick={stopStreamHandler}
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

        <div className="row">
          <div className="col-sm-12">
            <TweetView />
          </div>
        </div>
      </div>
    </div>
  );
};

export default hot(App);
