'use strict';

const { By } = require('selenium-webdriver');
const stampit = require('stampit');

const TodoListItemCreator = require('./todo-list-item-creator.page');
const TodoList = require('./todo-list.page');


const TodoListApp = stampit
  .props({
    driver: null,
    baseUrl: null,
  })
  .init(function ({ driver = this.driver, baseUrl = process.env.BASE_URL }) {
    this.driver = driver;
    this.baseUrl = baseUrl;
  })
  .methods({
    getTodoItemCreator() {
      return TodoListItemCreator({ driver: this.driver });
    },
    async getTodoList() {
      const listElement = await this.driver.findElement(By.id(TodoList.todoListId));

      return TodoList({ webElement: listElement });
    },
    async getCompleteList() {
      const listElement = await this.driver.findElement(By.id(TodoList.completeListId));

      return TodoList({ webElement: listElement });
    },
  });


module.exports = TodoListApp;
