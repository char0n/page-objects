const { expect } = require('chai');
const { Given, When, Then } = require('cucumber');

/**
 * Given steps.
 */

Given('I open the TodoListApp', async function() {
  await this.todoListApp.open();
});


/**
 * When steps.
 */

When('I enter an activity text {string}', async function(todoItemText) {
  const creator = this.todoListApp.getTodoItemCreator();

  await creator.focus();
  return creator.sendKeys(todoItemText);
});

When('I click on AddButton', async function() {
  const addButton = this.todoListApp.getTodoItemCreator().getAddButton();

  return addButton.click();
});

When('I create a new TodoListItem', async function() {
  return this.todoListApp.getTodoItemCreator().createNewTodoItem("new todo list item");
});

When('I delete this TodoListItem', async function() {
  const todoList = await this.todoListApp.getTodoList();
  const todoListItem = await todoList.getItemAt(0);

  return todoListItem.delete();
});

When('I complete this TodoListItem', async function() {
  const todoList = await this.todoListApp.getTodoList();
  const todoListItem = await todoList.getItemAt(0);

  return todoListItem.complete();
});

When('I uncomplete this TodoListItem', async function() {
  const todoList = await this.todoListApp.getCompleteList();
  const todoListItem = await todoList.getItemAt(0);

  return todoListItem.uncomplete();
});


/**
 * Then steps.
 */

Then('I can see new TodoListItem added to TodoList', async function() {
  const todoList = await this.todoListApp.getTodoList();
  const todoListItem = await todoList.getItemAt(0);
  const isTodo = await todoListItem.isTodo();
  const containsText = await todoListItem.containsText("new todo list item");

  expect(isTodo).to.be.true;
  expect(containsText).to.be.true;
});

Then('I can see the TodoListItem got deleted', async function() {
  const todoList = await this.todoListApp.getTodoList();
  const todoListItem = await todoList.getItemAt(0);

  expect(todoListItem).to.be.undefined;
});

Then('I can see the TodoListItem was moved to Completelist', async function() {
  const todoList = await this.todoListApp.getCompleteList();
  const todoListItem = await todoList.getItemAt(0);
  const isComplete = await todoListItem.isComplete();

  expect(isComplete).to.be.true;
});

Then('I can see the TodoListItem was moved to TodoList', async function() {
  const todoList = await this.todoListApp.getTodoList();
  const todoListItem = await todoList.getItemAt(0);
  const isTodo = await todoListItem.isTodo();

  expect(isTodo).to.be.true;
});
