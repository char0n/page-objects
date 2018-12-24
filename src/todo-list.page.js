'use strict';

const { By } = require('selenium-webdriver');
const stampit = require('stampit');

const TodoListItem = require('./todo-list-item.page');


const TodoList = stampit
  .statics({
    completeListId: 'completed',
    todoListId: 'todo',
  })
  .init(function ({ webElement }) {
    this.isComplete = async function isComplete() {
      return (await webElement.getId()) === TodoList.completeListId;
    };

    this.isTodo = async function isTodo() {
      return (await webElement.getId()) === TodoListItem.todoListId;
    };

    this.getItems = async function getItems() {
      const items = await webElement.findElements(By.css('li'));

      return items.map(itemWebElement => TodoListItem({ webElement: itemWebElement }));
    };
  })
  .methods({
    async getItemAt(index) {
      const items = await this.getItems();

      return items[index];
    },
  });


module.exports = TodoList;
