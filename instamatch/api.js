import React from 'react';

export default class Api {
  constructor() {
    this.options = {
      method: '',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: "",
    };
    this.uri = 'https://instamatch-api.herokuapp.com';
  }

  setMethod(method) {
    this.options.method = method;
  }

  setBody(body) {
    this.options.body = body;
  }

  fetchResults(path) {
    return fetch(`${this.uri}/${path}`, this.options)
      .then(response => response.json().then(data => data))
      .catch((error) => {
        console.log(error);
        throw error;
      });
  }

  getAllFriends(username) {
    this.setMethod('GET');
    return this.fetchResults(`friends/${username}/all`);
  }

  getAllTags(username) {
    this.setMethod('GET');
    return this.fetchResults(`tags/${username}`);
  }

  searchUser(name) {
    this.setMethod('GET');
    return this.fetchResults(`friends/search/${name}`);
  }

  addFriend(username, body) {
    this.setMethod('POST');
    this.setBody(body);
    return this.fetchResults(`friends/${username}`);
  }

  getUserDetails(username) {
    this.setMethod('GET');
    return this.fetchResults(`user/${username}`);
  }

  getFriendStatus(username, friendname) {
    this.setMethod('GET');
    this.setBody("");
    return this.fetchResults(`friends/${username}/${friendname}`);
  }
}
