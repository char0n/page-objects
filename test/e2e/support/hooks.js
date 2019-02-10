const { After, Before } = require('cucumber');


/**
 * Before steps
 */

Before(async function () {
  return this.browser.deleteAllCookies();
});

Before(async function () {
  // make sure window is desktop size
  return this.browser.setWindowSize(1366, 768);
});

/**
 * After steps - execution order is from bottom to top
 */

After(async function () {
  await this.browser.deleteAllCookies();
  return this.todoListApp.close();
});
