Feature: Reviewer Homepage
  Reviewer is able to see buttons and restarant near them

  Scenario: Reviewer see buttons at the top of page
    Given I visit on the Homepage
    Then I should see buttons "Food", "Drink & Dessert", "What to eat?" and "Restaurant near me"

  Scenario: Reviewer see list of restaurant near me
    Given I visit on the Homepage
    Then I should see list of "Restaurant near me"

  Scenario: Reviewer add favorite restaurant
    Given I visit on the Homepage
    Then I should see list of "Restaurant near me"
    And I should see "thin heart" icon
    When I click on "Heart" icon
    Then I should see "solid yellow heart" icon

  Scenario: Reviewer undo favorite restaurant
    Given I visit on the Homepage
    Then I should see list of "Restaurant near me"
    And I should see "solid heart" icon
    When I click "Heart" button
    Then I should see "light heart" icon

  Scenario: Reviewer see restaurant's detail
    Given I visit on the Homepage
    Then I should see list of "Restaurant near me"
    When I click title of Restaurant
    Then I should be on Restaurant's detail page

  Scenario: Reviewer see modal of food categories to select food categories
    Given I visit on the Homepage
    Then I should see "Food" button
    When I click "Food" button
    Then I should see modal of food categories

  Scenario: Reviewer selecting food categories to search restaurant
    Given I visit on the Homepage
    Then I should see "Food" button
    When I click "Food" button
    Then I should see modal of food categories
    When I click a categorie of food
    Then I should be on search result page

  Scenario: Reviewer see modal of drink and dessert categories
    Given I visit on the Homepage
    Then I should see "Drink & Dessert" button
    When I click "Drink & Dessert" button
    Then I should see modal of drink and dessert categories

  Scenario: Reviewer selecting drink and dessert categories to search restaurant
    Given I visit on the Homepage
    Then I should see "Drink & Dessert" button
    When I click "Drink & Dessert" button
    Then I should see modal of drink and dessert categories
    When I click a categorie of drink or dessert
    Then I should be on search result page

  Scenario: Reviewer want random food categories for going to eat today
    Given I visit on the Homepage
    Then I should see "What to eat?" button
    When I click "What to eat?" button
    Then I should be on random food categorie page

  Scenario: Reviewer want to see more list of restaurant near me
    Given I visit on the Homepage
    Then I should see "Restaurant near me" button
    When I click "Restaurant near me" button
    Then I should be on search result page with filter restaurant near me
