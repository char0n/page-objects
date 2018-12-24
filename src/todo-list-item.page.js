'use strict';

const stampit = require('stampit');


const TodoListItem = stampit
  .props({
    webElement: null,
    driver: null,
  })
  .init(function ({ webElement = this.webElement }) {
    this.webElement = webElement;
    this.driver = webElement.getDriver();
  })
  .methods({
    async isComplete() {

    },
    async delete() {

    },
    async complete() {

    },
  });
