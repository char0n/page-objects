'use strict';

const stampit = require('stampit');

const TodoListItemCreator = require('./todo-list-item-creator');


const TodoListApp = stampit.init(function ({ driver = null, baseUrl = process.env.BASE_URL }) {
  /**
   * Public API.
   */

  this.getTodoListItemCreator = function getTodoItemCreator() {
    return TodoListItemCreator(this.driver);
  };

  this.getTodoList = function getTodoList() {

  };

  this.getCompleteList = function getCompleteList() {

  };
});


module.exports = TodoApp;
