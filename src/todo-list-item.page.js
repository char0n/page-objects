'use strict';

const stampit = require('stampit');
const { By } = require('selenium-webdriver');


const TodoListItem = stampit
  .init(function ({ webElement }) {
    this.isComplete = async function isComplete() {
      const TodoList = require('./todo-list.page');
      const listElement = await webElement.findElement(By.xpath('..'));
      const todoList = TodoList({ webElement: listElement });

      return todoList.isComplete();
    };

    this.delete = async function _delete() {
      const button = await webElement.findElement(By.className('remove'));

      return button.click();
    };

    this.complete = async function complete() {
      const button = await webElement.findElement(By.className('complete'));

      if (!(await this.isComplete())) { return false; }

      return button.click();
    };

    this.uncomplete = async function uncomplete() {
      const button = await webElement.findElement(By.className('complete'));

      if (!(await this.isTodo())) { return false; }

      return button.click();
    };
  })
  .methods({
    async isTodo() {
      return !(await this.isComplete());
    },
  });


module.exports = TodoListItem;
