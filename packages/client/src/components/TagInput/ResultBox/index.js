import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import MainContext from '../../../context/MainContext';
import { queryAccount } from '../../../context/actions';
import LoadSpinner from '../../LoadSpinner';

import './styles.css';

export default function ResultBox({ query }) {
  const [searchResult, setSearchResult] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { store, dispatch } = useContext(MainContext);

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        const data = await queryAccount(query);
        if (data) {
          setSearchResult(data);
          // # simulate timeout
          setTimeout(() => setIsLoading(false), 2500);
        }
      };

      fetchData();
    } else {
      // # set search result empty
      setSearchResult({});
    }
  }, [query]);

  let renderSearchBox = null;

  if (Object.keys(searchResult).length > 0) {
    renderSearchBox = !isLoading ? (
      <div className="search-container">
        <img className="profile-pic" src={searchResult.profile_pic} alt="profile_pic" />
        <div className="right">
          <a className="name" href={searchResult.url}>
            {searchResult.name}
          </a>
          <div className="desc">{searchResult.description}</div>
          <div className="follower-count">Follower Count: {searchResult.followers_count}</div>
        </div>
      </div>
    ) : (
      <div className="search-container">
        <LoadSpinner variant="primary" />
      </div>
    );
  }

  return <>{renderSearchBox}</>;
}
