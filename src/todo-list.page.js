'use strict';

const { By } = require('selenium-webdriver');
const stampit = require('stampit');


const TodoList = stampit
  .init(function ({ driver = null }) {
    const findElement = () => this.driver.findElement(By.id('todo'));

    /**
     * Privileged API.
     */

    this.getItems = async function getItems() {
      const element = await findElement();
      const items = await element.findElements(By.css('li'));


    };
  })
  .methods({
    async getItemAt(index) {
      const items = await this.getItems();

      return items[index];
    },
  });

