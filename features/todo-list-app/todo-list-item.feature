Feature: Todo List Item
  As a person that needs to persist ad-hoc ideas
  I need to submit this ideas to the TodoListApp
  And maintain it there

  Background:
    Given I open the TodoListApp

  Scenario: Adding new TodoListItem
    When I enter an activity text "new todo list item"
    And I click on AddButton
    Then I can see new TodoListItem added to TodoList

  Scenario: Deleting existing TodoListItem
    When I create a new TodoListItem
    And I delete this TodoListItem
    Then I can see the TodoListItem got deleted

  Scenario: Completing existing TodoListItem
    When I create a new TodoListItem
    And I complete this TodoListItem
    Then I can see the TodoListItem was moved to Completelist

  Scenario: Uncompleting completed TodoListItem
    When I create a new TodoListItem
    And I complete this TodoListItem
    And I uncomplete this TodoListItem
    Then I can see the TodoListItem was moved to TodoList
