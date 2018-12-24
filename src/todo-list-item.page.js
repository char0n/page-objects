'use strict';

const { By } = require('selenium-webdriver');
const stampit = require('stampit');

const TodoList = require('./todo-list.page');


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
      const listElement = await this.webElement.findElement(By.xpath('..'));
      const todoList = TodoList({ webElement: listElement });

      return todoList.isComplete();
    },
    async isTodo() {
      const isComplete = await this.isComplete();

      return !isComplete;
    },
    async delete() {
      const button = await this.webElement.findElement(By.className('remove'));

      return button.click();
    },
    async complete() {
      const button = await this.webElement.findElement(By.className('complete'));
      const isComplete = await this.isComplete();

      if (!isComplete) { return false; }

      return button.click();
    },
    async uncomplete() {
      const button = await this.webElement.findElement(By.className('complete'));
      const isTodo = await this.isTodo();

      if (!isTodo) { return false; }

      return button.click();
    },
  });


module.exports = TodoListItem;
