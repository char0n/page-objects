'use strict';

const { setWorldConstructor } = require('cucumber');
const env = require('env-var/env-var');

const TodoListApp = require('../../../src/todo-list-app.page');
const { buildDriver } = require('../driver-builder');
const Browser = require('./env/Browser');
const Backend = require('./env/Backend');
const WebElementEnhanced = require('./WebElementEnhanced');


function TodoListAppWorld() {
  const OS = env.get('OS').asString();
  const HEADLESS = env.get('HEADLESS').asBoolStrict();
  const BASE_URL = env.get('BASE_URL').asString();

  const driver = buildDriver({
    OS,
    HEADLESS,
  });

  driver.WebElementEnhanced = WebElementEnhanced;
  this.browser = Browser({ driver });
  this.backend = Backend({ driver });
  this.todoListApp = TodoListApp({ driver, baseUrl: BASE_URL });
}

setWorldConstructor(TodoListAppWorld);
