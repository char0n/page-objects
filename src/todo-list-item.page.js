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
      const isComplete = await this.isComplete();

      if (isComplete) { return false; }

      return button.click();
    };

    this.uncomplete = async function uncomplete() {
      const button = await webElement.findElement(By.className('complete'));
      const isTodo = await this.isTodo();

      if (isTodo) { return false; }

      return button.click();
    };

    this.containsText = async function containsText(text) {
      return webElement.getDriver().WebElementEnhanced(webElement).containsText(text);
    };

    this.isDisplayed = async function isDisplayed() {
      try {
        return webElement.isDisplayed();
      } catch (e) {
        return false;
      }
    };
  })
  .methods({
    async isTodo() {
      return !(await this.isComplete());
    },
  });


module.exports = TodoListItem;
