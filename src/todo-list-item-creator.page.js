'use strict';

const { By } = require('selenium-webdriver');
const stampit = require('stampit');



const AddButton = stampit.init(function ({ driver = null }) {
  const findElement = () => this.driver.findElement(By.css('header button'));

  /**
   * Privileged API.
   */

  this.click = async function click() {
    const element = await findElement();

    return element.click();
  };
});


const TodoListItemCreatorPage = stampit
  .statics({
    AddButton,
  })
  .init(function ({ driver = null }) {
    this.driver = driver;

    /**
     * Private API.
      */

    const findElement = () => this.driver.findElement(By.css('header'));

    /**
     * Privileged API.
     */

    this.focus = async function focus() {
      const element = await findElement();

      return element.sendKeys('');
    };

    this.sendKeys = async function sendKeys(...keys) {
      const element = await findElement();

      return element.sendKeys(...keys);
    };
  })
  .methods({
    async createNew(text) {
      await this.focus();
      await this.sendKeys(text);

      const addButton = this.getAddButton();

      return addButton.click();
    },
    getAddButton() {
      return AddButton({ driver: this.driver });
    },
});


module.exports = TodoListItemCreatorPage;
