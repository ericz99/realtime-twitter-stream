import socket from 'socket.io';

// # import twitter stuff
import { initStream, streamObj } from '../utils/twitter';

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
      startStream(twitterObj(options), io);
    });

    // # listen for stop stream
    socket.on(START_STREAMING, options => {
      stopStream(twitterObj(options), io);
    });

    // # sync config + start stream
    socket.on(SYNC_CONFIG, options => {
      console.log('hi');
      initStream(io, { follow: [3648333676], exclude_replies: true, include_rts: false });
    });
  });
};
