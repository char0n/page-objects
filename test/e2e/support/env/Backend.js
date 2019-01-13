'use strict';

const stampit = require('stampit');

const Environment = require('./Environment');


const Backend = stampit(Environment, {
  init({ driver }) {
    this.flushDatabase = async function flushDatabase() {
      // call you database backend API here
    };
    this.loadFixtures = async function loadFixtures() {
      // call to your backend API for loading the fixtures
    };
  },
});


module.exports = Backend;
