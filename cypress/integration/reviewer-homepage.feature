Feature: Reviewer Homepage
  Reviewer is able to see buttons and restarant near them

  Background:
    Given I visit on login page
    When I complete fill in login form
      | email               | password |
      | nampunch1@gmail.com | 12345678 |
    And I click on Login button
    Then I should see reviewer homepage


  Scenario: Reviewer see buttons at the top of page
    When  I should see search box
    And   I should see buttons
            | button |
            | FoodBtn |
            | DrinkAndDessertBtn |
    And I should see list of Restaurant near me

  Scenario: Reviewer see restaurant detail
    When  I click title of Restaurant
    Then  I should be on Restaurant detail page

  Scenario: Reviewer like restaurant
    When  I click "Love" button
    Then  I should see love button change

  Scenario: Reviewer unlike restaurant
    When  I unclick "Love" button
    Then  I should see love button change


  # Scenario: Reviewer see modal of food categories to select food categories
  #   When  I click "Food" button
  #   Then  I should see modal of food categories
  
  # Scenario: Reviewer see modal of drink and dessert categories
  #   When  I click "Drink & Dessert" button
  #   Then  I should see modal of drink and dessert categories



  