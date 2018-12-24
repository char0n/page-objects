'use strict';

const stampit = require('stampit');
import { pipe, split, includes } from 'ramda';
import { isFunction } from 'ramda-adjunct';


const WebElementEnhanced = stampit({
  props: {
    webElement: null,
  },
  init({ webElement }) {
    this.webElement = webElement;
  },
  methods: {
    async containsClassName(className) {
      const classList = await this.webElement.getAttribute('class');

      return pipe(split(' '), includes(className))(classList);
    },
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


export default webElement => new Proxy(WebElementEnhanced({ webElement }), handler);
