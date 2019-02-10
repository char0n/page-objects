'use strict';

const { pipe } = require('ramda');
const { isUndefined } = require('ramda-adjunct');
const { Builder, Capabilities, promise } = require('selenium-webdriver');



// opt-out promise manager https://github.com/SeleniumHQ/selenium/issues/2969
promise.USE_PROMISE_MANAGER = false;


/**
 * Capabilities.
 */

const chromeDriverCapabilities = ({ HEADLESS }) => {
  const capabilities = Capabilities.chrome();

  capabilities.set('loggingPrefs', { browser: 'ALL', driver: 'ALL' });

  if (HEADLESS || isUndefined(HEADLESS)) {
    capabilities.set('chromeOptions', { args: ['--headless'] });
  }

  return capabilities;
};


/**
 * Driver builder.
 */


const driverBuilder = (capabilities) => {
  const builder = new Builder();

  builder.withCapabilities(capabilities);
  return builder.build();
};


/**
 * Drivers.
 */

const chromeDriver = pipe(chromeDriverCapabilities, driverBuilder);

const buildDriver = ({ OS, HEADLESS }) => {
  // chrome driver is default and only driver for now
  return chromeDriver({ HEADLESS, OS });
};


module.exports = {
  driverBuilder,
  buildDriver,
};
