'use strict';

const stampit = require('stampit');
const { URL } = require('url');

const Environment = require('./Environment');


const Browser = stampit(Environment, {
  init({ driver }) {
    this.setWindowSize = async function setWindowSize(width, height) {
      return driver.manage().window().setRect({ width, height });
    };

    this.getCurrentUrl = async function getCurrentUrl() {
      return new URL(await driver.getCurrentUrl());
    };

    this.deleteAllCookies = async function deleteAllCookies() {
      return driver.manage().deleteAllCookies();
    };
  },
});


module.exports = Browser;
