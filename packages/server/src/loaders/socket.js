import socket from 'socket.io';

// # import twitter stuff
import { initStream, stopInitStream } from '../utils/twitter';

// # import stream handlers
import { startStream, stopStream } from '../utils/streamHandler';

// # import constants
import { START_STREAMING, STOP_STREAMING, SYNC_CONFIG } from '../constants';

export default server => {
  // # init socket server
  const io = socket(server);
  // # listen on connection
  io.on('connection', socket => {
    // # listen for start stream
    socket.on(START_STREAMING, options => {
      // startStream(streamObj(options));
    });

    // # listen for stop stream
    socket.on(STOP_STREAMING, options => {
      stopInitStream(options);
    });

    // # sync config + start stream
    socket.on(SYNC_CONFIG, options => {
      initStream(io, options);
    });
  });
};
