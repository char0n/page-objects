'use strict';

const stampit = require('stampit');
const { pipe, split, includes } = require('ramda');
const { isFunction } = require('ramda-adjunct');


const WebElementEnhanced = stampit
  .init(function ({ webElement }) {
    this.containsClassName = async function containsClassName(className) {
      const classList = await webElement.getAttribute('class');

      return pipe(split(' '), includes(className))(classList);
    };

    this.containsText = async function containsText(text) {
      const elementText = await webElement.getText();

      return includes(text, elementText);
    };
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


export default webElement => new Proxy(WebElementEnhanced({ webElement }), handler);
