'use strict';

const stampit = require('stampit');
const { pipe, split, includes } = require('ramda');
const { isFunction } = require('ramda-adjunct');


const WebElementEnhanced = stampit
  .props({
    webElement: null,
  })
  .init(function ({ webElement }) {
    this.webElement = webElement;
  })
  .methods({
    async containsClassName(className) {
      const classList = await this.webElement.getAttribute('class');

      return pipe(split(' '), includes(className))(classList);
    },
    async containsText(text) {
      const elementText = await this.webElement.getText();

      return includes(text, elementText);
    },
  });


const handler = {
  get(target, propKey) {
    // calling methods on WebElementEnhanced API
    if (isFunction(target[propKey])) {
      return async function (...args) {
        return target[propKey](...args);
      };
    }

    // calling methods on the original WebElement API
    return async function (...args) {
      return target.webElement[propKey](...args);
    };
  },
};


module.exports = webElement => new Proxy(WebElementEnhanced({ webElement }), handler);
