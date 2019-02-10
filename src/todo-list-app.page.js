'use strict';

const stampit = require('stampit');
const { By } = require('selenium-webdriver');

const TodoList = require('./todo-list.page');
const TodoListItemCreator = require('./todo-list-item-creator.page');


const TodoListApp = stampit
  .conf({
    baseUrl: process.env.BASE_URL,
  })
  .init(function ({ driver }, { stamp }) {
    this.open = async function open(location = '') {
      return driver.get(`${stamp.compose.configuration.baseUrl}${location}`);
    };

    this.close = async function close() {
      return driver.quit();
    };

    this.getTodoItemCreator = function getTodoItemCreator() {
      return TodoListItemCreator({ driver });
    };

    this.getTodoList = async function getTodoList() {
      const listElement = await driver.findElement(By.id(TodoList.todoListId));

      return TodoList({ webElement: listElement });
    };

    this.getCompleteList = async function getCompleteList() {
      const listElement = await driver.findElement(By.id(TodoList.completeListId));

      return TodoList({ webElement: listElement });
    };
  });


module.exports = TodoListApp;
