import React from 'react';

export default class Api {
  constructor() {
    this.options = {
      method: '',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    };
    this.uri = 'https://instamatch-api.herokuapp.com';
  }

  setMethod(method) {
    this.options.method = method;
  }

  fetchResults(path) {
    return fetch(`${this.uri}/${path}`, this.options)
      .then(response => response.json().then(data => data))
      .catch((error) => {
        console.log(error);
      });
  }

  getAllFriends(username) {
    this.setMethod('GET');
    return this.fetchResults(`friends/${username}/all`);
  }

  getAllTags(username) {
    this.setMethod('GET');
    return this.fetchResults(`/tags/${username}`);
  }
}
