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
    this.setBody("");
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

  getTagFriends(username, tag) {
    this.setMethod('GET');
    this.setBody("");
    return this.fetchResults(`tags/${username}/${tag}`);
  }

  addTag(username, body){
    this.setMethod('POST');
    this.setBody(body);
    console.log("within addTag: " + JSON.stringify(this));
    return this.fetchResults(`tags/${username}`);
  }

  addFriendToTag(username, body) {
    this.setMethod('POST');
    this.setBody(body);
    return this.fetchResults(`tags/friends/${username}`);
  }

  changeUserDetails(username, body) {
    this.setMethod('PUT');
    this.setBody(body);
    return this.fetchResults(`user/${username}`);
  }

  deleteAccount(username) {
    this.setMethod('DELETE');
    return this.fetchResults(`user/${username}`);
  }

  deleteFriend(username, body) {
    this.setMethod('DELETE');
    this.setBody(body);
    return this.fetchResults(`friends/${username}`);
  }

  addToMatchQueue(username, body) {
    this.setMethod('POST');
    this.setBody(body);
    return this.fetchResults(`match/${username}`);
  }

  checkMatch(username) {
    this.setMethod('GET');
    this.setBody("");
    return this.fetchResults(`match/${username}`);
  }

  checkMatchQueue() {
    this.setMethod('GET');
    this.setBody("");
    return this.fetchResults(`match/pool`);
  }

  deleteFromMatchQueue(username) {
    this.setMethod('DELETE');
    return this.fetchResults(`match/${username}`);
  }

  signUp(body) {
    this.setMethod('POST');
    this.setBody(body);
    console.log("within signup: " + JSON.stringify(this));
    return this.fetchResults(`auth/signup`);
  }

  login(body) {
    this.setMethod('POST');
    this.setBody(body);
    console.log(this);
    return this.fetchResults(`auth/login`);
  }
}
