import React, { useState, useContext, useRef, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { Button } from 'react-bootstrap';
import io from 'socket.io-client';

import { NEW_TWEET, SYNC_CONFIG, STOP_STREAMING } from './context/types';
import InputField from './components/InputField';
import TagInput from './components/TagInput';
import ButtonGroup from './components/ButtonGroup';
import Log from './components/Log';
import TweetView from './components/TweetView';

// # import our context provider
// import { startStream, stopStream, listenToTweet } from './context/GlobalState';
import MainContext from './context/MainContext';

let socket;

const App = () => {
  const [streamStarted, setStreamStarted] = useState(false);
  const { store, dispatch, initStream } = useContext(MainContext);
  const streamBtnRef = useRef(null);
  const ENDPOINT = 'http://localhost:8080';

  useEffect(() => {
    // # init stream
    socket = io(ENDPOINT);

    // # listen to client
    socket.on('connect', () => {
      console.log('client connected!');
    });

    // # ONLY if stream started
    if (streamStarted) {
      console.log('hi');
      // # listen to tweets
      socket.on(NEW_TWEET, tweet => {
        dispatch({
          type: NEW_TWEET,
          payload: tweet
        });
      });
    }

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, [ENDPOINT, streamStarted]);

  // # handle start stream
  const startStreamHandler = e => {
    const userIds = store.accounts.map(({ accountID }) => accountID);
    const options = { follow: userIds, exclude_replies: true, include_rts: false };
    console.log('starting stream');
    // # start stream
    socket.emit(SYNC_CONFIG, options);

    setStreamStarted(streamStarted => !streamStarted);
  };

  // # handle stop stream
  const stopStreamHandler = e => {
    const userIds = store.accounts.map(({ accountID }) => accountID);
    const options = { follow: userIds, exclude_replies: true, include_rts: false };
    console.log('stopping stream');
    // # start stream
    socket.emit(STOP_STREAMING, options);

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
            <TagInput streamStarted={streamStarted} />
            <ButtonGroup>{streamButton}</ButtonGroup>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-12">
            <TweetView tweets={store.tweets} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default hot(App);
