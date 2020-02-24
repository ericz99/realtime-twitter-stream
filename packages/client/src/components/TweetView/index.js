import React, { useRef, useEffect } from 'react';

import './styles.css';

export default function TweetView({ tweets }) {
  const tweetListRef = useRef(null);

  // # scroll to bottom
  const scrollToBottom = () => {
    tweetListRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [tweets]);

  return (
    <div className="tweet-viewer">
      <ul className="tweet-list">
        {tweets.map(tweet => (
          <li className="tweet" key={Math.random()}>
            <img
              className="profile-pic"
              src={tweet.user.profile_image_url_https}
              alt="profile_pic"
            />
            <div className="right">
              <div className="tweet-header">
                <span className="name">{tweet.user.name}</span>
                <span className="screen_name">@{tweet.user.screen_name}</span>
              </div>
              <div className="desc">{tweet.text}</div>
            </div>
          </li>
        ))}

        <li ref={tweetListRef} />
      </ul>
    </div>
  );
}
