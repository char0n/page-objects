'use strict';

const stampit = require('stampit');
const { By } = require('selenium-webdriver');


const AddButton = stampit.init(function ({ driver }) {
  const findElement = () => driver.findElement(By.css('header button'));

  this.isEnabled = async function isEnabled() {
    const element = await findElement();

    return element.isEnabled();
  };

  this.click = async function click() {
    const element = await findElement();

    return element.click();
  };
});


const TodoListItemCreator = stampit
  .statics({
    AddButton,
  })
  .init(function ({ driver }) {
    const findElement = () => driver.findElement(By.css('header'));

    this.focus = async function focus() {
      const element = await findElement();

      return element.sendKeys('');
    };

    this.sendKeys = async function sendKeys(...keys) {
      const element = await findElement();

      return element.sendKeys(...keys);
    };

    this.getAddButton = function getAddButton() {
      return AddButton({ driver });
    };
  })
  .methods({
    async createNewTodoItem(text) {
      await this.focus();
      await this.sendKeys(text);

      const addButton = this.getAddButton();

      return addButton.click();
    },
});


module.exports = TodoListItemCreator;
