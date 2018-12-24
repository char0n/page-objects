'use strict';

const { By } = require('selenium-webdriver');
const stampit = require('stampit');

const TodoListItem = require('./todo-list-item.page');


const TodoList = stampit
  .statics({
    completeListId: 'completed',
    todoListId: 'todo',
  })
  .props({
    webElement: null,
  })
  .init(function ({ webElement = this.webElement }) {
    this.webElement = webElement;
  })
  .methods({
    async isComplete() {
      const id = await this.webElement.getId();

      return id === TodoList.completeListId;
    },
    async isTodo() {
      const id = await this.webElement.getId();

      return id === TodoList.todoListId;
    },
    async getItems() {
      const items = await this.webElement.findElements(By.css('li'));

      return items.map(webElement => TodoListItem({ webElement }));
    },
    async getItemAt(index) {
      const items = await this.getItems();

      return items[index];
    },
  });


module.exports = TodoList;
